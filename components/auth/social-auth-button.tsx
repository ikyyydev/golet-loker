"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { githubSignIn, googleSignIn } from "@/actions/social-login";

export const GoogleLoginButton = () => {
  return (
    <Button
      onClick={googleSignIn}
      className="flex items-center justify-center gap-1 py-2.5 rounded-md text-white font-medium text-sm bg-blue-600 hover:bg-blue-600/90 w-full cursor-pointer"
    >
      <FcGoogle />
      Masuk dengan Google
    </Button>
  );
};

export const GithubLoginButton = () => {
  return (
    <Button
      onClick={githubSignIn}
      className="flex items-center justify-center gap-1 py-2.5 rounded-md text-white font-medium text-sm bg-gray-800 hover:bg-gray-800/90 w-full cursor-pointer"
    >
      <FaGithub />
      Masuk dengan Github
    </Button>
  );
};
