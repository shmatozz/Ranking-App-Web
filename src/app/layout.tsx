import {Montserrat} from "next/font/google";
import "./globals.css";
import {Header, Footer} from "@/widgets/navigation";
import React from "react";
import {FloatingCircles} from "@/shared/ui";
import Script from "next/script";
import * as process from "node:process";
import {NotificationsList} from "@/features/notifications";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.className} antialiased flex flex-col min-h-screen`}
      >
        <Header/>
        <FloatingCircles/>

        <NotificationsList/>

        <main className="flex flex-col flex-grow py-[3.25rem] shadow-md scroll">
          {children}
        </main>

        <Footer/>

        <Script src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_API_KEY}&lang=ru_RU`} strategy="beforeInteractive" />
      </body>
    </html>
  );
}
