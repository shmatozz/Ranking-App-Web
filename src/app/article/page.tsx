import React, {Suspense} from "react";
import {ArticlePage} from "@/screens/article";
import {SessionProvider} from "next-auth/react";

export default function Article() {
  return (
    <SessionProvider>
      <Suspense>
        <ArticlePage/>
      </Suspense>
    </SessionProvider>
  )
}
