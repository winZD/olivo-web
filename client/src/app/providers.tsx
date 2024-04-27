"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session?: Session;
}

const Providers = ({ children, session }: Props) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
