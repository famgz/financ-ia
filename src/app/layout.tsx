import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
      <body className={`${mulish.className} antialised dark`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <div className="flex h-full flex-col">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
