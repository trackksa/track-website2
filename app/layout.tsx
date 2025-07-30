// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import ClientLayout from "@/components/client-nav"; // This will hold Navbar and client state
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
