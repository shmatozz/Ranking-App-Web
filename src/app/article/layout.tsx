import React from "react";

export default function ArticleLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
