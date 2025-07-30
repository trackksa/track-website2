"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  Camera,
  Monitor,
  Radio,
  Mic,
  Users,
  Music,
  Film,
  ArrowRight,
  Check,
  Star,
  Award,
  Heart,
  Target,
  Palette,
  Headphones,
  Settings,
  Globe,
  Smartphone,
  Tv,
  Volume2,
  Edit3,
  FileVideo,
  Layers,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import HeaderPage from "@/components/heading";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [waveHeights, setWaveHeights] = useState(() => generateWaveHeights());
  const { language } = useLanguage();
  const t = content[language];

  function generateWaveHeights() {
    return Array.from({ length: 12 }, () => Math.random() * 100 + 20);
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(generateWaveHeights());
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const mainServices = [
    {
      id: 1,
      title: t.services.eventCoverage.title,
      description: t.services.eventCoverage.description,
      color: "#28bca2",
      icon: Camera,
      image: "/photo19.jpg?height=500&width=700&text=Event+Coverage",
      features: t.services.eventCoverage.features,
      stats: t.services.eventCoverage.stats,
      subServices: t.services.eventCoverage.details.map((detail, i) => ({
        name: detail.name,
        icon: [Heart, Users, Target, Music, Monitor, Award][i] || Heart,
        description: "", // Add localization if available
        price: detail.price,
      })),
    },
    {
      id: 2,
      title: t.services.audioProduction.title,
      description: t.services.audioProduction.description,
      color: "#ff6b35",
      icon: Music,
      image: "/photo6.jpg?height=500&width=700&text=Audio+Production",
      features: t.services.audioProduction.features,
      stats: t.services.audioProduction.stats,
      subServices: t.services.audioProduction.details.map((detail, i) => ({
        name: detail.name,
        icon: [Mic, Volume2, Heart, Music, Users, Radio][i] || Mic,
        description: "", // Add localization if available
        price: detail.price,
      })),
    },
    {
      id: 3,
      title: t.services.visualProduction.title,
      description: t.services.visualProduction.description,
      color: "#00bcd4",
      icon: Film,
      image: "/photo1.jpg?height=500&width=700&text=Visual+Production",
      features: t.services.visualProduction.features,
      stats: t.services.visualProduction.stats,
      subServices: t.services.visualProduction.details.map((detail, i) => ({
        name: detail.name,
        icon: [Tv, Film, Smartphone, Layers, FileVideo, Monitor][i] || Tv,
        description: "", // Add localization if available
        price: detail.price,
      })),
    },
  ];

  const additionalServices = t.services.additionalServices.items.map(
    (item, i) => ({
      icon: [Settings, Palette, Globe, Headphones][i] || Settings,
      title: item.title,
      description: "", // Add localization if available
      features: item.features,
    })
  );

  const testimonials = t.services.testimonials.items.map((item) => ({
    name: item.name,
    position: item.position,
    rating: item.rating || 5,
    text: item.quote,
    image: "/placeholder.svg?height=80&width=80&text=" + item.name,
    project: item.project,
  }));

  return (
    <div className="min-h-screen bg-white">
      <HeaderPage
        title={t.services.hero.title}
        description={t.services.hero.subtitle}
        image="/photo16.jpg" // replace with your actual image path
      />

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-extralight text-gray-800 mb-4">
                <span className="text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-gray-900 via-[#28bba4] to-[#28bba4] bg-clip-text text-transparent">
                  {t.services.intro.heading}
                </span>
              </h2>
              <div className="w-24 h-1 bg-[#28bca2] mx-auto rounded-full"></div>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.services.intro.description}
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeTab === index;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 ${
                    isActive
                      ? "shadow-xl scale-105 text-white"
                      : "hover:scale-102 hover:shadow-lg text-gray-600 bg-white border-2 border-gray-200"
                  }`}
                  style={{
                    backgroundColor: isActive ? service.color : "white",
                    borderColor: isActive ? service.color : "#e5e7eb",
                  }}
                >
                  <Icon size={24} />
                  <div className="text-left">
                    <div className="font-bold">{service.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Content */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: mainServices[activeTab].color }}
                  >
                    {React.createElement(mainServices[activeTab].icon, {
                      size: 32,
                    })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {mainServices[activeTab].title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 text-left">
                  {mainServices[activeTab].description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4 text-left">
                    {t.services.intro.featuresTitle}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {mainServices[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${mainServices[activeTab].color}20`,
                          }}
                        >
                          <Check
                            size={14}
                            style={{ color: mainServices[activeTab].color }}
                          />
                        </div>
                        <span className="text-gray-700 text-left">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {Object.entries(mainServices[activeTab].stats).map(
                    ([key, value], index) => (
                      <div key={index} className="text-center">
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: mainServices[activeTab].color }}
                        >
                          {value}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {key}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-white"
                  style={{ backgroundColor: mainServices[activeTab].color }}
                >
                  <span className="mr-3">Order Service Now</span>
                  <ArrowRight size={20} />
                </Button>
              </div>

              {/* Visual Side */}
              <div className="relative">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={mainServices[activeTab].image || "/placeholder.svg"}
                    alt={mainServices[activeTab].title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${mainServices[activeTab].color}40, ${mainServices[activeTab].color}10)`,
                    }}
                  />

                  {/* Border */}
                  <div
                    className="absolute inset-0 rounded-3xl border-4 transition-all duration-500"
                    style={{
                      borderColor: `${mainServices[activeTab].color}60`,
                      boxShadow: `0 0 30px ${mainServices[activeTab].color}30`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-services Grid */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {mainServices[activeTab].title} Details
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainServices[activeTab].subServices.map((subService, index) => {
                const Icon = subService.icon;
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${mainServices[activeTab].color}15`,
                          }}
                        >
                          <Icon
                            size={24}
                            style={{ color: mainServices[activeTab].color }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-left">
                            {subService.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {subService.name}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 text-left leading-relaxed">
                        {subService.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold text-lg"
                          style={{ color: mainServices[activeTab].color }}
                        >
                          {subService.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-[#28bca2]">
                {t.services.additionalServices.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.services.additionalServices.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#28bca2] to-[#28bca2]/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 text-left leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check size={14} className="text-[#28bca2]" />
                          <span className="text-left">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-[#28bca2]">
                {t.services.testimonials.title}
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.services.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-left">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 text-left">
                        {testimonial.position}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-left leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>

                  <div className="text-sm text-[#28bca2] font-medium text-left">
                    {testimonial.project}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
