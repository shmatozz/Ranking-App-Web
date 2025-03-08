import React from "react";
import {UsefulPage} from "@/screens/useful";
import {SessionProvider} from "next-auth/react";

export default function Useful() {
  return (
    <SessionProvider>
      <UsefulPage/>
    </SessionProvider>
  )
}
