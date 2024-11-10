import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financ.ia",
  description: "Seu app de finanças com integração IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark`}>
        <div className="flex h-screen flex-col">
          {/* header */}
          <main className="flex-1">{children}</main>
          {/* footer */}
        </div>
      </body>
    </html>
  );
}
