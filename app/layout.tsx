import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hiep Nguyen Ngoc | Personal Portfolio",
  description: "Hiep Nguyen Ngoc is a full-stack developer with 5 years of experience.",
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "a20ccdbacbbd4ceda85f899cea5035a3"}'></script>
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        {children}
      </body>
    </html>
  );
}
