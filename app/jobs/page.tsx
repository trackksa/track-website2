"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  Play,
  X,
  Camera,
  Music,
  Film,
  Calendar,
  User,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import HeroSections from "@/components/heading";
// import Header from "./components/header";
import { content } from "@/app/i18n";
import { useLanguage } from "@/app/context/LanguageContext";

// Define the Project type for better type safety
type Project = {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  client: string;
  clientEn: string;
  date: string;
  images: string[];
  featured: boolean;
  youtubeUrl?: string; // <-- Added
};

export default function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // SSR-safe default for waveHeights
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(12).fill(50));
  const [vibrationTime, setVibrationTime] = useState(0); // SSR-safe default
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = content[language];
  const getEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  function generateWaveHeights() {
    return Array.from({ length: 12 }, () => Math.random() * 100 + 20);
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setWaveHeights(generateWaveHeights());
    const interval = setInterval(() => {
      setWaveHeights(generateWaveHeights());
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVibrationTime(Date.now());
    }, 50);
    return () => clearInterval(interval);
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

  // FIX: Correct type for project argument
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSections
        title={t.portfolio.hero.title}
        description={t.portfolio.hero.subtitle}
        image="/photo20.jpg" // replace with your actual image path
      />

      {/* Portfolio Section */}
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-extralight text-gray-800 mb-4">
            <span className="text-5xl md:text-7xl lg:text-9xl bg-gradient-to-r from-gray-900 via-[#28bba4] to-[#28bba4] bg-clip-text text-transparent">
              {t.portfolio.worksSection.heading}
            </span>
          </h2>
          <div className="w-24 h-1 bg-[#28bca2] mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const categoryInfo = categories.find(
                (cat) => cat.id === project.category
              );

              // Find the first image file (not audio)
              const firstImage = (project.images || []).find(
                (img) =>
                  img.match(/^https?:\/\/.+/) &&
                  !img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
              );
              // Find the first audio file
              const firstAudio = (project.images || []).find((img) =>
                img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
              );

              return (
                <Card
                  key={project.id}
                  className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  onClick={() => openProjectModal(project)}
                >
                  <CardContent className="p-0">
                    {/* Project Image or Audio Icon */}
                    <div className="relative h-64 overflow-hidden rounded-t-lg flex items-center justify-center bg-white">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <Music
                          size={64}
                          className="text-[#28bca2] opacity-60"
                        />
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-[#28bca2] text-white px-3 py-1 rounded-full text-sm font-medium">
                          مميز
                        </div>
                      )}

                      {/* Category Badge */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: categoryInfo?.color }}
                      >
                        {categoryInfo?.name}
                      </div>

                      {/* View Button */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Eye size={20} className="text-gray-800" />
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 text-right">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{project.titleEn}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 text-right line-clamp-2">
                        {project.description}
                      </p>

                      {/* Project Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(project.date).toLocaleDateString("ar-SA")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span className="text-right">{project.client}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t.portfolio.worksSection.noProjects.title}
              </h3>
              <p className="text-gray-600">
                {t.portfolio.worksSection.noProjects.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 text-right">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600">{selectedProject.titleEn}</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Project Images, Videos, and Audios */}
              {/* 1. Photos Section */}
              {selectedProject.images.some(
                (img) =>
                  img.match(/^https?:\/\/.+/) &&
                  !img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
              ) && (
                <div className="mb-8 flex flex-col items-center w-full">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Camera size={20} className="text-[#28bca2]" />
                    Photos
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 w-full max-w-3xl justify-center">
                    {selectedProject.images
                      .filter(
                        (img) =>
                          img.match(/^https?:\/\/.+/) &&
                          !img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
                      )
                      .map((image, index) => (
                        <div
                          key={index}
                          className="relative h-64 rounded-xl overflow-hidden flex justify-center items-center"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${selectedProject.title} ${index + 1}`}
                            fill
                            className="object-cover border-4 border-gray-200 rounded-2xl shadow-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 2. Videos Section (YouTube) */}
              {selectedProject.youtubeUrl &&
                getEmbedUrl(selectedProject.youtubeUrl) && (
                  <div className="mb-8 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Film size={20} className="text-[#28bca2]" />
                      Videos
                    </h3>
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex justify-center">
                      <div className="w-full aspect-video">
                        <iframe
                          src={getEmbedUrl(selectedProject.youtubeUrl)!}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="rounded-xl w-full h-full min-h-[200px] max-h-[420px]"
                          style={{ background: "#000" }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}

              {/* 3. Audios Section */}
              {selectedProject.images.some((img) =>
                img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
              ) && (
                <div className="mb-8 flex flex-col items-center w-full">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Music size={20} className="text-[#28bca2]" />
                    Audios
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 w-full max-w-3xl justify-center">
                    {selectedProject.images
                      .filter((img) =>
                        img.match(/\.(mp3|wav|ogg|m4a|aac|flac|webm|oga)$/i)
                      )
                      .map((audio, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center justify-center h-64 bg-gray-50 border-4 border-gray-200 rounded-2xl shadow-sm"
                        >
                          <Music size={48} className="text-[#28bca2] mb-4" />
                          <audio controls className="w-full max-w-xs">
                            <source src={audio} />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Project Details */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project Description */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#28bca2] to-[#20a085] rounded-full"></div>
                      Project Overview
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="relative pl-4">
                      <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        {selectedProject.description}
                      </p>
                      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-[#28bca2]/20 to-transparent"></div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProject.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#28bca2] to-[#20a085] rounded-full"></div>
                      Project Details
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {/* Client Information */}
                    <div className="group hover:bg-white/50 p-4 rounded-xl transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#28bca2] to-[#20a085] rounded-xl flex items-center justify-center shadow-lg">
                            <User size={20} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg mb-1">
                            {selectedProject.client}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {selectedProject.clientEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Project Date */}
                    <div className="group hover:bg-white/50 p-4 rounded-xl transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar size={20} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {new Date(selectedProject.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-gray-600 text-sm">Project Date</p>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="group hover:bg-white/50 p-4 rounded-xl transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${
                                categories.find(
                                  (cat) => cat.id === selectedProject.category
                                )?.color || "#28bca2"
                              }, ${
                                categories.find(
                                  (cat) => cat.id === selectedProject.category
                                )?.color || "#28bca2"
                              }dd)`,
                            }}
                          >
                            {React.createElement(
                              categories.find(
                                (cat) => cat.id === selectedProject.category
                              )?.icon || Eye,
                              {
                                size: 20,
                                className: "text-white",
                              }
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {
                              categories.find(
                                (cat) => cat.id === selectedProject.category
                              )?.name
                            }
                          </p>
                          <p className="text-gray-600 text-sm">
                            Project Category
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave-slide {
          0% {
            transform: translateX(-100px) scaleX(0.5);
            opacity: 0.5;
          }
          50% {
            transform: translateX(calc(100vw - 100px)) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) scaleX(0.5);
            opacity: 0.5;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
