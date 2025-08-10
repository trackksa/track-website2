
import type { Metadata } from "next";
import ContactPage from "./contactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Track. اتصل بشركة تراك لطرح استفساراتك أو طلباتك. نحن هنا لخدمتك عبر الهاتف أو البريد الإلكتروني أو شبكات التواصل.",
  keywords: [
    "Track",
    "Contact Track",
    "Get in touch",
    "Contact us",
    "Phone",
    "Email",
    "تراك",
    "اتصل بنا",
    "تواصل معنا",
    "الهاتف",
    "البريد الإلكتروني",
    "وسائل التواصل",
  ],
  openGraph: {
    title: "Contact Us | اتصل بنا - Track | تراك",
    description:
      "Get in touch with Track. اتصل بشركة تراك لطرح استفساراتك أو طلباتك. نحن هنا لخدمتك عبر الهاتف أو البريد الإلكتروني أو شبكات التواصل.",
    url: "https://trackksa.com/contact",
    siteName: "Contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
