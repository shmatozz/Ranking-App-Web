import React from "react";
import {AboutPage} from "@/screens/about";
import {SessionProvider} from "next-auth/react";

export default function About() {
  return (
    <SessionProvider>
      <AboutPage/>
    </SessionProvider>
  )
}
