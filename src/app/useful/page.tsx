import React from "react";
import {UsefulPage} from "@/screens/useful";
import Script from "next/script";

export default function Useful() {
  return (
    <>
      <Script src="https://api-maps.yandex.ru/v3/?apikey=4ea655dd-c6a3-417c-b49f-c294a34336df&lang=ru_RU" strategy="beforeInteractive" />
      <UsefulPage/>
    </>
  )
}
