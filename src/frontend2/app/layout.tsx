import { GeistSans } from "geist/font/sans";
import AuthButton from "@/components/AuthButton";
import "./globals.css";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="w-full absolute">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 absolute z-50">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <Link  href="/dashboard" className="btn btn-ghost">KAAA 🦅🦅🦅</Link>
              <AuthButton />
            </div>
          </nav>
        </div>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
