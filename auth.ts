import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prismadb } from "@/common/libs/prismadb";
import authConfig from "@/auth.config";
import { getUserById } from "@/common/data/user";
import { UserRole } from "./generated/prisma/enums";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      // Prevent signin with email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 0,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  ...authConfig,
});
