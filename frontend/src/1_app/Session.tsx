"use client"

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";


export default function Session({children}: PropsWithChildren) {
  return (
   <SessionProvider>
    {children}
   </SessionProvider>
  );
}
