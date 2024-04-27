"use client";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SignInForm from "@/app/components/SignInForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function SignInPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <SignInForm />
    </div>
  );
}
