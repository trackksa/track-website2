"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const t = content[language];
  const isArabic = language === "ar";

  const services = [
    { name: t.footer.services.event, href: "#services" },
    { name: t.footer.services.audio, href: "#services" },
    { name: t.footer.services.visual, href: "#services" },
  ];

  const quickLinks = [
    { name: t.footer.quickLinks.home, href: "/" },
    { name: t.footer.quickLinks.services, href: "/services" },
    { name: t.footer.quickLinks.portfolio, href: "/jobs" },
    { name: t.footer.quickLinks.about, href: "/about" },
    { name: t.footer.quickLinks.contact, href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                {t.footer.companyName}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                {t.footer.description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span>{t.footer.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span>{t.footer.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span>{t.footer.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className={`text-slate-300 hover:text-emerald-400 transition-colors duration-200 transform inline-block ${
                      isArabic ? "hover:-translate-x-1" : "hover:translate-x-1"
                    }`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`text-slate-300 hover:text-emerald-400 transition-colors duration-200 transform inline-block ${
                      isArabic ? "hover:-translate-x-1" : "hover:translate-x-1"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-6 ${
              isArabic ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex items-center gap-6">
              <span className="text-slate-300 font-medium">
                {isArabic ? "تابعنا على:" : "Follow Us:"}
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-slate-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 ${
              isArabic ? "md:flex-row-reverse text-right" : ""
            }`}
          >
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} {t.footer.companyName}.{" "}
              {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-slate-400/50 text-sm">
              {isArabic ? "تم التطوير بواسطة" : "Developed by"}{" "}
              <Link
                href="https://www.alogza.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                Alogza
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
