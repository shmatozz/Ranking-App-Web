import {Montserrat} from "next/font/google";
import "./globals.css";
import {Header, Footer} from "@/widgets/navigation";
import React from "react";

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
        className={`${montserrat.className} antialiased`}
      >
        <Header/>

        {children}

        <Footer/>
      </body>
    </html>
  );
}
