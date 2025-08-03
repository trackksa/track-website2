"use client";

import type React from "react";
import { useState } from "react";
import HeroSection from "@/components/heading";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = content[language];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          phone: formData.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "An error occurred. Please try again.");
      } else {
        setSuccess(
          "Your message has been successfully sent! We will contact you soon."
        );
        setFormData({ name: "", phone: "", email: "", message: "" });
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t.contact.hero.title}
        description={t.contact.hero.subtitle}
        image="/photo21.jpg"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 tracking-tighter">
              <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                {t.contact.getInTouch.heading}
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4 font-light">
              {t.contact.getInTouch.description}
            </p>
          </div>

          {/* Contact Info + Form */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  title: t.contact.getInTouch.contactInfo.titleemail,
                  value: t.contact.getInTouch.contactInfo.email,
                },
                {
                  icon: Phone,
                  title: t.contact.getInTouch.contactInfo.titlephone,
                  value: t.contact.getInTouch.contactInfo.phone,
                },
                {
                  icon: MapPin,
                  title: t.contact.getInTouch.contactInfo.titlelocation,
                  value: t.contact.getInTouch.contactInfo.location,
                },
              ].map((item, index) => (
                <GlassCard
                  key={index}
                  className="p-6 group hover:scale-105 transition-all duration-500 hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-[#28bba4]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-[#28bba4]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        {item.title}
                      </p>
                      <p className="text-gray-600 font-light group-hover:text-gray-700">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}

              {/* Social Media */}
              <div className="pt-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t.contact.socialMedia.title}
                </h3>
                <div className="flex gap-4 justify-center">
                  {t.contact.socialMedia.platforms.map((platform, i) => {
                    const icons = [Facebook, Instagram, Twitter, Linkedin];
                    const hrefs = [
                      "https://facebook.com/track",
                      "https://instagram.com/track",
                      "https://twitter.com/track",
                      "https://linkedin.com/company/track",
                    ];
                    const classes = [
                      "bg-blue-600 hover:bg-blue-700",
                      "bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
                      "bg-blue-400 hover:bg-blue-500",
                      "bg-blue-700 hover:bg-blue-800",
                    ];
                    const Icon = icons[i];
                    return (
                      <a
                        key={i}
                        href={hrefs[i]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${classes[i]} transition-colors`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <GlassCard className="p-8 hover:scale-105 h-[500px] transition-all duration-500 hover:shadow-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={t.contact.getInTouch.form.namePlaceholder}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#28bba4] focus:ring-[#28bba4]/20 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  required
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#28bba4] focus:ring-[#28bba4]/20 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={t.contact.getInTouch.form.emailPlaceholder}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#28bba4] focus:ring-[#28bba4]/20 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t.contact.getInTouch.form.messagePlaceholder}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#28bba4] focus:ring-[#28bba4]/20 focus:outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                  required
                ></textarea>

                {error && (
                  <div className="text-red-600 text-center">{error}</div>
                )}
                {success && (
                  <div className="text-green-600 text-center">{success}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#28bba4] to-[#28bba4]/80 hover:from-[#28bba4]/90 hover:to-[#28bba4]/70 text-white py-4 rounded-2xl font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                  disabled={loading}
                >
                  <span className="flex items-center justify-center">
                    {loading ? "Sending..." : t.contact.getInTouch.form.button}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </form>
            </GlassCard>
          </div>

          {/* Map + Quick Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
            {/* Map */}
            <div className="pt-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t.contact.mapSection.title}
              </h3>
              <div className="rounded-2xl overflow-hidden shadow-md w-full h-[300px] md:h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2158.0594348149334!2d39.82521949243341!3d21.420826397153153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b74c28d467%3A0xb2f543a618225767!2sAl%20Kaaba!5e1!3m2!1sen!2s!4v1753881204521!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-3xl p-6 shadow-xl h-full flex flex-col justify-center">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t.contact.quickContact.title}
                </h2>
                <p className="text-gray-600">
                  {t.contact.quickContact.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.contact.quickContact.methods.map((method, i) => (
                  <a
                    key={i}
                    href={
                      method.type === "Call Now" || method.type === "اتصل الآن"
                        ? `tel:${method.value}`
                        : "https://wa.me/966556611173"
                    }
                    target={
                      method.type === "Call Now" || method.type === "اتصل الآن"
                        ? undefined
                        : "_blank"
                    }
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: i === 0 ? "#28bba4" : "#28bba4",
                    }}
                    className="text-white p-6 rounded-2xl text-center hover:opacity-90 transition-all duration-300 group flex flex-col items-center justify-center"
                  >
                    {i === 0 ? (
                      <Phone className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    ) : (
                      <MessageCircle className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    )}
                    <h3 className="text-lg font-bold mb-1">{method.type}</h3>
                    <p className="opacity-90 text-sm">{method.value}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
