import React, {Suspense} from "react";
import {CompetitionPage} from "@/screens/competition";

export default function Competition() {
  return (
    <Suspense>
      <CompetitionPage/>
    </Suspense>
  );
}
