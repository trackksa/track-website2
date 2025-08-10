// app/[lang]/about/page.tsx
import type { Metadata } from "next";
import AboutTrack from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional event coverage, audio production, and visual storytelling that brings your vision to life. تغطية احترافية للفعاليات، إنتاج صوتي، وسرد بصري يجسّد رؤيتك إلى الواقع.",
  keywords: [
    "Track",
    "About Track",
    "Mission",
    "Vision",
    "Goals",
    "Company Profile",
    "تراك",
    "عن تراك",
    "الرسالة",
    "الرؤية",
    "الهدف",
    "نبذة عن الشركة",
  ],
  openGraph: {
    title: "About Track | عن تراك",
    description:
      "Professional event coverage, audio production, and visual storytelling that brings your vision to life. تغطية احترافية للفعاليات، إنتاج صوتي، وسرد بصري يجسّد رؤيتك إلى الواقع.",
    url: "https://trackksa.com/about",
    siteName: "About",
  },
};

export default function Page() {
  return <AboutTrack />;
}
