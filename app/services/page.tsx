// app/[lang]/about/page.tsx
import type { Metadata } from "next";
import ServicesPage from "./servicesClient";

export const metadata: Metadata = {
  title: "Our  Services",
  description:
    "Discover Track's professional services in event coverage, audio production, and visual production. اكتشف خدمات تراك في تغطية الفعاليات، الإنتاج الصوتي، والإنتاج المرئي.",
  keywords: [
    "Track",
    "Services",
    "Event Coverage",
    "Audio Production",
    "Visual Production",
    "تراك",
    "خدماتنا",
    "تغطية الفعاليات",
    "إنتاج صوتي",
    "إنتاج مرئي",
  ],
  openGraph: {
    title: "Our Services | خدماتنا - Track | تراك",
    description:
      "Discover Track's professional services in event coverage, audio production, and visual production. اكتشف خدمات تراك في تغطية الفعاليات، الإنتاج الصوتي، والإنتاج المرئي.",
    url: "https://trackksa.com/services",
    siteName: "Our  Services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
