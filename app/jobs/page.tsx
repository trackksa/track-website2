// app/[lang]/about/page.tsx
import type { Metadata } from "next";
import PortfolioPage from "./JobsPageClient";// (step 2 below)

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our portfolio of event coverage, audio production, and visual production projects. استكشف أعمالنا في تغطية الفعاليات، الإنتاج الصوتي، والإنتاج المرئي.",
  keywords: [
    "Track",
    "Portfolio",
    "Projects",
    "Event Coverage",
    "Audio Production",
    "Visual Production",
    "تراك",
    "أعمالنا",
    "مشاريع",
    "تغطية الفعاليات",
    "إنتاج صوتي",
    "إنتاج مرئي",
  ],
  openGraph: {
    title: "Our Work | أعمالنا - Track | تراك",
    description:
      "Explore our portfolio of event coverage, audio production, and visual production projects. استكشف أعمالنا في تغطية الفعاليات، الإنتاج الصوتي، والإنتاج المرئي.",
    url: "https://trackksa.com/jobs",
    siteName: "Our Work",
  },
};

export default function Page() {
  return <PortfolioPage />;
}
