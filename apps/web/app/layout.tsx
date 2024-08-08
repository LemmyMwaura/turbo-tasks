import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "Task Tracker Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
