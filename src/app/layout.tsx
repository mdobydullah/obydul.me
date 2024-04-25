import type { Metadata } from "next";
import "@xterm/xterm/css/xterm.css";
import "./terminal.css";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.META_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
