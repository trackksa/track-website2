// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import ClientLayout from "@/components/client-nav"; // This will hold Navbar and client state
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Trackksa",
  description: "A specialized company in audio and visual content production, committed to delivering exceptional quality through a team of seasoned experts and industry professionals.",
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
