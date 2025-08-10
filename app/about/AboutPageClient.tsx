"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroSections from "@/components/heading";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";


// util to create random bar heights
function generateWaveHeights() {
  return Array.from({ length: 12 }, () => Math.random() * 100 + 20);
}



export default function AboutTrack() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [waveHeights, setWaveHeights] = useState(() => generateWaveHeights());
  const { language } = useLanguage();

  const t = content[language];
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(generateWaveHeights());
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateVibration = () => {
      setWaveHeights((prev) => [...prev]);
    };

    const vibrationInterval = setInterval(animateVibration, 100);
    return () => clearInterval(vibrationInterval);
  }, []);

  return (
    <>
      <HeroSections
        title={t.about.hero.title}
        description={t.about.hero.subtitle}
        image="/photo13.jpg" // replace with your actual image path
      />

      {/* Add the new About Section */}
      <AboutSection />
    </>
  );
}

// Mission, Vision, Values Section Component with Sequential Image Movement
function AboutSection() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [imagePositions, setImagePositions] = useState([0, 1, 2]); // [mission_pos, vision_pos, values_pos]
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleSections((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll(".about-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  //   // Move images sequentially: Mission → Vision → Values → Mission
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setImagePositions((prev) => [
  //         (prev[0] + 1) % 3, // Mission image moves to next position
  //         (prev[1] + 1) % 3, // Vision image moves to next position
  //         (prev[2] + 1) % 3, // Values image moves to next position
  //       ]);
  //     }, 4000);

  //     return () => clearInterval(interval);
  //   }, []);

  const sectionImages = [
    "/photo3.jpg", // Vision image
    "/photo7.jpg", // Mission image
    "/photo18.jpg", // Values image
  ];
  const sections = [
    {
      title: t.about.aboutSection.mission.title,
      color: "#28bca2",
      description: t.about.aboutSection.mission.description,
    },
    {
      title: t.about.aboutSection.vision.title,
      color: "#ff6b35",
      description: t.about.aboutSection.vision.description,
    },
    {
      title: t.about.aboutSection.values.title,
      color: "#00bcd4",
      description: t.about.aboutSection.values.description,
    },
  ];

  // Helper function to get which image should be displayed in which section
  const getImageForSection = (sectionIndex: number) => {
    // Find which original image is currently in this section position
    const imageIndex = imagePositions.findIndex((pos) => pos === sectionIndex);
    return imageIndex !== -1 ? imageIndex : 0;
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-extralight text-gray-800 mb-4">
            {t.about.aboutSection.heading}
            <span className="text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-gray-900 via-[#28bba4] to-[#28bba4] bg-clip-text text-transparent">
              Track
            </span>
          </h2>
          <div className="w-24 h-1 bg-[#28bca2] mx-auto rounded-full"></div>
        </div>

        {/* Sections Grid */}
        <div className="space-y-20">
          {sections.map((section, sectionIndex) => {
            const isVisible = visibleSections.includes(sectionIndex);
            const isEven = sectionIndex % 2 === 0;
            const currentImageIndex = getImageForSection(sectionIndex);
            const currentImageData = sections[currentImageIndex];

            return (
              <div
                key={sectionIndex}
                data-index={sectionIndex}
                className={`about-section flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? "lg:pr-10" : "lg:pl-10"}`}>
                  <div
                    className={`transform transition-all duration-1000 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${sectionIndex * 200}ms` }}
                  >
                    {/* Title Section */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-4 h-12 rounded-full"
                          style={{ backgroundColor: section.color }}
                        />
                        <div>
                          <h3 className="text-3xl font-bold text-gray-800">
                            {section.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {section.description}
                    </p>
                    {/* <p className="text-gray-500 font-arabic text-right leading-relaxed">
                      {section.descriptionAr}
                    </p> */}

                    {/* Animated Line */}
                    <div className="mt-8">
                      <div
                        className={`h-1 rounded-full transition-all duration-1000 ${
                          isVisible ? "w-24" : "w-0"
                        }`}
                        style={{
                          backgroundColor: section.color,
                          transitionDelay: `${sectionIndex * 200 + 500}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Visual Side with Moving Images */}
                <div className="flex-1 flex justify-center">
                  <div
                    className={`relative transform transition-all duration-1000 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ transitionDelay: `${sectionIndex * 200 + 300}ms` }}
                  >
                    {/* Main Image Container */}
                    <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl">
                      {/* All Images Stacked with Transitions */}
                      {sectionImages.map((imageSrc, imgIndex) => {
                        const isCurrentImage =
                          imagePositions[imgIndex] === sectionIndex;
                        const isNextImage =
                          imagePositions[imgIndex] === (sectionIndex + 1) % 3;
                        const isPrevImage =
                          imagePositions[imgIndex] === (sectionIndex + 2) % 3;

                        return (
                          <div
                            key={`${sectionIndex}-${imgIndex}`}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                              isCurrentImage
                                ? "opacity-100 scale-100 z-10"
                                : isNextImage
                                ? "opacity-0 scale-110 translate-x-8 z-5"
                                : isPrevImage
                                ? "opacity-0 scale-90 -translate-x-8 z-0"
                                : "opacity-0 scale-95 z-0"
                            }`}
                          >
                            <Image
                              src={imageSrc || "/background-music.jpg"}
                              alt={sections[imgIndex].title}
                              fill
                              className="object-cover"
                            />

                            {/* Dynamic Color Overlay based on current image */}
                            <div
                              className="absolute inset-0 bg-gradient-to-br opacity-20 transition-all duration-1000"
                              style={{
                                background: `linear-gradient(135deg, ${sections[imgIndex].color}40, ${sections[imgIndex].color}10)`,
                              }}
                            />
                          </div>
                        );
                      })}

                      {/* Dynamic Border that changes with current image */}
                      <div
                        className="absolute inset-0 rounded-3xl border-4 transition-all duration-1000"
                        style={{
                          borderColor: `${currentImageData.color}60`,
                          boxShadow: `0 0 30px ${currentImageData.color}30`,
                        }}
                      />

                      {/* Movement Indicator Arrows */}
                      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
                          style={{
                            backgroundColor: `${currentImageData.color}80`,
                          }}
                        >
                          <div className="w-0 h-0 border-l-2 border-r-0 border-t-2 border-b-2 border-transparent border-l-white transform rotate-45"></div>
                        </div>
                      </div>

                      {/* Section Position Indicators */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {sections.map((_, dotIndex) => {
                          const imageInThisSection =
                            getImageForSection(dotIndex);
                          return (
                            <div
                              key={dotIndex}
                              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                dotIndex === sectionIndex
                                  ? "scale-125 ring-2 ring-white"
                                  : "scale-100 opacity-60"
                              }`}
                              style={{
                                backgroundColor:
                                  sections[imageInThisSection].color,
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Current Image Label */}
                      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="transform transition-all duration-500">
                          <h4 className="text-white font-bold text-xl">
                            {currentImageData.title}
                          </h4>
                          <p className="text-white/80 font-arabic">
                            {currentImageData.titleAr}
                          </p>
                          <div className="text-xs text-white/60 mt-1">
                            {sections[currentImageIndex].title} →{" "}
                            {sections[sectionIndex].title}
                          </div>
                        </div>
                      </div> */}

                      {/* Animated Corner Element */}
                      <div
                        className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500"
                        style={{
                          backgroundColor: `${currentImageData.color}90`,
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-white/30 animate-ping" />
                      </div>

                      {/* Moving Particles */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full animate-float opacity-70 transition-colors duration-1000"
                          style={{
                            backgroundColor: currentImageData.color,
                            top: `${20 + Math.sin((i * Math.PI) / 2) * 25}%`,
                            left: `${20 + Math.cos((i * Math.PI) / 2) * 25}%`,
                            animationDelay: `${i * 300}ms`,
                            animationDuration: "3s",
                          }}
                        />
                      ))}
                    </div>

                    {/* Side Decorative Elements */}
                    <div
                      className="absolute -top-6 -left-6 w-12 h-12 rounded-full animate-bounce transition-colors duration-1000"
                      style={{ backgroundColor: currentImageData.color }}
                    />
                    <div
                      className="absolute -bottom-6 -right-6 w-8 h-8 rounded-full animate-pulse transition-colors duration-1000"
                      style={{ backgroundColor: `${currentImageData.color}80` }}
                    />

                    {/* Movement Trail Effect */}
                    <div className="absolute inset-0 pointer-events-none max-sm:hidden block">
                      <div
                        className="absolute w-full h-full rounded-3xl border-2 border-dashed opacity-30 animate-spin"
                        style={{
                          borderColor: currentImageData.color,
                          animationDuration: "8s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom Decorative Element */}
        <div className="text-center mt-20">
          <div
            className={`inline-flex items-center space-x-4 transform transition-all duration-1000 ${
              visibleSections.length >= 3
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-[#28bca2] to-[#ff6b35] rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-[#ff6b35] to-[#00bcd4] rounded-full shadow-lg animate-bounce"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00bcd4] to-[#28bca2] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
