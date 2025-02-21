import React, {Suspense} from "react";
import {CompetitionPage} from "@/screens/competition";
import {SessionProvider} from "next-auth/react";

export default function Competition() {
  return (
    <Suspense>
      <SessionProvider>
        <CompetitionPage/>
      </SessionProvider>
    </Suspense>
  );
}
