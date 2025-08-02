"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WaveShowcase } from "@/components/wave-showcase";
import { GlassCard } from "@/components/glass-card";
import {
  Menu,
  X,
  Globe,
  Play,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Star,
  Lightbulb,
  Palette,
  Code,
  Camera,
  Quote,
  CheckCircle,
  ArrowDown,
  Music,
  Film,
  Calendar,
  User,
  Eye,
} from "lucide-react";
import { ScrollProgress } from "@/components/scroll-progress";
import { FloatingElements } from "@/components/floating-elements";
import { ParticleField } from "@/components/particle-field";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";

// Add Project type for linter

type Project = {
  id: string;
  title?: string;
  category?: string;
  images?: string[];
};

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then(setProjects)
      .catch(console.error);
  }, []);

  const categories = [
    {
      id: "all",
      name: "جميع الأعمال",
      nameEn: "All Work",
      color: "#28bca2",
      icon: Eye,
    },
    {
      id: "event-coverage",
      name: "تغطية الفعاليات",
      nameEn: "Event Coverage",
      color: "#28bca2",
      icon: Camera,
    },
    {
      id: "audio-production",
      name: "إنتاج صوتي",
      nameEn: "Audio Production",
      color: "#ff6b35",
      icon: Music,
    },
    {
      id: "visual-production",
      name: "إنتاج مرئي",
      nameEn: "Visual Production",
      color: "#00bcd4",
      icon: Film,
    },
  ];
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const t = content[language];

  const portfolioImages = [
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
    "/image.jpg",
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Particle Field */}
      <ParticleField />

      {/* Floating Elements */}
      {/* <FloatingElements /> */}
      {/* Background Pattern */}

      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #28bba4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #28bba4 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Premium Navigation */}
      {/* Premium Navigation with Enhanced Glass Effect */}
      {/* Use the Navbar component here */}

      {/* Enhanced Hero Section with Special Background */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 20% 80%, rgba(40, 187, 164, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.9) 50%, rgba(229, 231, 235, 0.8) 100%)`,
        }}
      >
        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 0%, rgba(40, 187, 164, 0.05) 25%, transparent 50%, rgba(139, 92, 246, 0.05) 75%, transparent 100%)`,
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10 ">
          <div className="max-w-6xl mx-auto">
            {/* Absolutely positioned WaveShowcase overlay */}
            <div
              className="absolute left-0 right-0 max-sm:top-5 top-28 z-30 flex justify-center pointer-events-auto"
              style={{ width: "100%", height: "auto" }}
            >
              <WaveShowcase
                images={portfolioImages}
                centerImage="/events.jpg"
              />
            </div>

            {/* Enhanced Animated Badge */}
            {/* <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#28bba4]/15 to-purple-500/15 backdrop-blur-2xl rounded-full px-8 py-3 border border-[#28bba4]/30 shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-[#28bba4] rounded-full animate-ping"></div>
              <span className="text-gray-700 font-medium tracking-wide">{t.hero.badge}</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
            </div> */}

            {/* Revolutionary Title */}
            <h1
              className={`text-5xl md:text-7xl  font-extralight mb-8 tracking-tighter leading-none animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-200 inline-block bg-gradient-to-r from-gray-900 via-[#28bba4] to-[#28bba4] bg-clip-text text-transparent ${
                language === "ar"
                  ? "lg:text-8xl  max-sm:h-[60px] h-[120px]"
                  : "lg:text-9xl"
              }`}
            >
              {/* <span
                className="inline-block bg-gradient-to-r from-gray-900 via-[#28bba4] to-[#28bba4] bg-clip-text text-transparent"
                style={{
                  backgroundSize: "300% 100%",
                  animation: "gradient-shift 6s ease-in-out infinite, float 4s ease-in-out infinite",
                }}
              > */}
              {t.home.hero.title}
              {/* </span> */}
            </h1>

            {/* Subtitle */}
            {/* <p
              className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide animate-pulse mb-[450px]"
              style={{ animationDelay: "0.2s" }}
            >
              {t.hero.subtitle}
            </p> */}

            {/* Arabic Slogan with Special Effects */}
            <p
              className="text-xl md:text-2xl text-[#28bba4] max-sm:mb-[220px] mb-[420px] font-medium animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-600"
              // style={{
              //   animation: "3s ease-in-out infinite, float 6s ease-in-out infinite",
              //   textShadow: "0 0 20px rgba(40, 187, 164, 0.3)",
              // }}
            >
              {t.home.hero.slogan}
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-800">
              {t.home.hero.subtitle}
            </p>

            {/* Enhanced CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#28bba4] to-[#28bba4]/80 hover:from-[#28bba4]/90 hover:to-[#28bba4]/70 text-white px-12 py-5 rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#28bba4]/25 group relative overflow-hidden"
              >
                <span className="relative z-10">{t.hero.cta}</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-[#28bba4] hover:text-[#28bba4] hover:bg-[#28bba4]/5 px-12 py-5 rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-110 bg-white/70 backdrop-blur-sm group shadow-lg"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t.hero.playDemo}
              </Button>
            </div> */}

            {/* Enhanced Scroll Hint */}
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-gray-500 text-sm mb-3 font-light tracking-wide">
                {t.home.hero.cta}
              </span>
              <div className="w-6 h-10 border-2 border-[#28bba4]/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#28bba4] rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of sections remain the same... */}

      {/* Enhanced About Section */}
      <section
        id="about"
        className="py-32 relative transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter transition-all duration-700 hover:scale-105">
                <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                  {t.home.discover.title}
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light  max-w-3xl mx-auto leading-relaxed transition-all duration-500 hover:text-gray-700">
                {t.home.discover.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
              <div className="space-y-8">
                <p className="text-gray-600 text-lg text-justify leading-relaxed mb-4 hover:text-gray-700">
                  {t.home.discover.about}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {t.home.discover.stats.map((stat, index) => (
                    <GlassCard
                      key={index}
                      className={`p-8 text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl${
                        index ? ` delay-[${index * 100}ms]` : ""
                      }`}
                    >
                      <div className="text-4xl font-bold text-[#28bba4] mb-3 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-light tracking-wide transition-all duration-300 group-hover:text-gray-700">
                        {stat.label}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-[#28bba4]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <GlassCard
                  className="p-8 relative z-10 group-hover:scale-105 transition-all duration-500"
                  hover={false}
                >
                  <Image
                    src="/photo2.jpg"
                    alt="About Track"
                    width={600}
                    height={500}
                    className="rounded-2xl object-cover w-full transition-all duration-500 group-hover:scale-105"
                  />
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with Image Cards */}
      <section
        id="services"
        className="py-32 bg-gradient-to-b from-gray-50/50 to-white relative transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter transition-all duration-700 hover:scale-105">
              <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                {t.home.services.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto transition-all duration-500 hover:text-gray-700">
              {t.home.services.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {t.home.services.items.map((service, index) => (
              <div
                key={index}
                className="group hover:scale-105 transition-all duration-700 hover:shadow-2xl relative overflow-hidden rounded-3xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden rounded-3xl">
                  {/* Background Image */}
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-[#28bba4]/80 group-hover:via-[#28bba4]/40" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transition-all duration-500">
                    <h3 className="text-xl font-medium mb-3 tracking-wide transition-all duration-300 group-hover:text-white group-hover:scale-105">
                      {service.title}
                    </h3>

                    <p className="text-white/90 leading-relaxed font-light mb-4 text-sm transition-all duration-300 group-hover:text-white">
                      {service.desc}
                    </p>

                    {/* <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-white/80 transition-all duration-300 hover:text-white"
                        >
                          <div className="w-1.5 h-1.5 bg-[#28bba4] rounded-full transition-all duration-300 group-hover:scale-125" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div> */}
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#28bba4]/50 rounded-3xl transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section id="process" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">{t.process.title}</h2>
            <p className="text-xl text-gray-600 font-light">{t.process.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {t.process.steps.map((step, index) => (
                <div key={index} className="text-center group relative">
                  <GlassCard className="p-8 mb-6">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 font-light text-sm">{step.desc}</p>
                  </GlassCard>
                  {index < t.process.steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-[#28bba4]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Enhanced Portfolio Section */}
      <section
        id="portfolio"
        className="py-32 bg-gradient-to-b from-white to-gray-50/50 relative transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter transition-all duration-700 hover:scale-105">
              <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                {t.home.selectedWorks.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light transition-all duration-500 hover:text-gray-700">
              {t.home.selectedWorks.description}
            </p>
          </div>

          {/* Enhanced Portfolio Filter */}
          {/* <div className="flex justify-center mb-16">
            <GlassCard className="p-3 backdrop-blur-xl transition-all duration-500 hover:shadow-xl" hover={false}>
              <div className="flex space-x-2">
                {t.portfolio.categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "ghost"}
                    className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === 0
                        ? "bg-gradient-to-r from-[#28bba4] to-[#28bba4]/80 text-white shadow-lg hover:shadow-xl"
                        : "text-gray-600 hover:text-[#28bba4] hover:bg-[#28bba4]/10"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </GlassCard>
          </div> */}
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "shadow-lg scale-105"
                      : "hover:scale-102 hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${category.color}15` : "white",
                    border: `2px solid ${
                      isActive ? category.color : "#e5e7eb"
                    }`,
                    color: isActive ? category.color : "#6b7280",
                  }}
                >
                  <Icon size={20} />
                  <span className="font-medium text-right">
                    {category.name}
                  </span>
                  <span className="text-sm opacity-70">{category.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Projects Grid (show only 6) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.slice(0, 6).map((project, index) => (
              <GlassCard key={project.id} className="overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.images?.[0] || "/project.jpg"}
                    alt={project.title || `Portfolio ${index + 1}`}
                    width={500}
                    height={224}
                    className="object-cover w-full h-full group-hover:scale-110 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-lg font-medium mb-2">
                        {project.title || `Project ${index + 1}`}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {project.category || "Creative Direction"}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section
        id="testimonials"
        className="py-32 relative transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter transition-all duration-700 hover:scale-105">
              <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                {t.home.testimonials.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light transition-all duration-500 hover:text-gray-700">
              {t.home.testimonials.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.home.testimonials.items.map((testimonial, index) => (
              <GlassCard
                key={index}
                className={`p-8 text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl relative overflow-hidden${
                  index ? ` delay-[${index * 100}ms]` : ""
                }`}
              >
                <div className="absolute inset-0 bg-[#28bba4]/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <Quote className="h-10 w-10 text-[#28bba4] mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10" />

                <p className="text-gray-600 leading-relaxed font-light mb-6 italic relative z-10 transition-all duration-300 group-hover:text-gray-700">
                  "{testimonial.quote}"
                </p>

                <div className="flex justify-center mb-4 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-[#28bba4] fill-current group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  <p className="font-medium text-gray-900 mb-1 transition-all duration-300">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm font-light transition-all duration-300 group-hover:text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        dir={language === "ar" ? "rtl" : "ltr"}
        className="py-32 bg-gradient-to-b from-gray-50/50 to-white relative transition-all duration-1000"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-extralight text-gray-900 mb-8 tracking-tighter">
              <span className="bg-gradient-to-r from-gray-900 to-[#28bba4] bg-clip-text text-transparent">
                {t.home.contact.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-20 font-light">
              {t.home.contact.subtitle}
            </p>

            <div
              className={`grid md:grid-cols-2 gap-16 ${
                language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: t.home.contact.contactInfo.titleemail,
                    value: t.home.contact.contactInfo.email,
                  },
                  {
                    icon: Phone,
                    title: t.home.contact.contactInfo.titlephone,
                    value: t.home.contact.contactInfo.phone,
                  },
                  {
                    icon: MapPin,
                    title: t.home.contact.contactInfo.titlelocation,
                    value: t.home.contact.contactInfo.location,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 bg-white rounded-3xl shadow-md`}
                  >
                    <div
                      className={`flex items-center ${
                        language === "ar"
                          ? "flex-row-reverse text-right space-x-reverse space-x-0 gap-4"
                          : "flex-row text-left gap-4"
                      }`}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 bg-[#28bba4]/20 rounded-2xl flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-[#28bba4]" />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col w-full overflow-hidden">
                        <p className="text-base font-semibold text-gray-900 leading-tight">
                          {item.title}
                        </p>
                        <p
                          className={`text-sm text-gray-600 ${
                            language === "ar" ? "text-right" : "text-left"
                          } break-words whitespace-pre-line`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div>
                <form className="bg-white rounded-3xl p-8 shadow-md space-y-6">
                  <input
                    type="text"
                    placeholder={language === "ar" ? "اسمك" : "Your Name"}
                    className={`w-full px-6 py-4 border border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#28bba4]/20 transition-all duration-300 font-light ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  />
                  <input
                    type="email"
                    placeholder={
                      language === "ar" ? "بريدك الإلكتروني" : "Your Email"
                    }
                    className={`w-full px-6 py-4 border border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#28bba4]/20 transition-all duration-300 font-light ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  />
                  <textarea
                    rows={5}
                    placeholder={
                      language === "ar"
                        ? "أخبرنا عن مشروعك..."
                        : "Tell me about your project..."
                    }
                    className={`w-full px-6 py-4 border border-gray-200 rounded-2xl bg-white/70 backdrop-blur-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#28bba4]/20 transition-all duration-300 resize-none font-light ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  ></textarea>

                  <Button className="w-full bg-gradient-to-r from-[#28bba4] to-[#28bba4]/80 hover:from-[#28bba4]/90 hover:to-[#28bba4]/70 text-white py-4 rounded-2xl font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                    <span className="flex items-center justify-center gap-2">
                      {language === "ar" && (
                        <ArrowRight className="rotate-180" />
                      )}
                      {t.home.contact.form.button}
                      {language !== "ar" && (
                        <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(40, 187, 164, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(40, 187, 164, 0.6),
              0 0 40px rgba(40, 187, 164, 0.3);
          }
        }
      `}</style>
    </div>
  );
}
