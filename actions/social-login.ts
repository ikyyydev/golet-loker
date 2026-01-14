"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export async function googleSignIn() {
  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}

export async function githubSignIn() {
  await signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}
