import React from "react";

export default function UsefulLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
