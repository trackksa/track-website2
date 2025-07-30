// admin-page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  User,
  Camera,
  Music,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRef } from "react";

interface Project {
  id: string;
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
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    category: "event-coverage",
    client: "",
    clientEn: "",
    date: "",
    images: [],
    featured: false,
    youtubeUrl: "", // <-- Added
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]); // fallback to empty array
          console.error("Projects API did not return an array:", data);
        }
      })
      .catch((err) => {
        setProjects([]);
        console.error(err);
      });
  }, []);

  // Helper to get Cloudinary endpoint based on file type
  const getCloudinaryEndpoint = (file: File, cloudName: string) => {
    if (file.type.startsWith("image/")) {
      return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    } else if (file.type.startsWith("audio/")) {
      return `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
    }
    throw new Error("Unsupported file type");
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    console.log("Cloudinary config:", { cloudName, uploadPreset });

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary config is missing in .env.local");
    }

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset);

    console.log("Uploading file:", file.name, "Size:", file.size);

    const endpoint = getCloudinaryEndpoint(file, cloudName);
    const res = await fetch(endpoint, {
      method: "POST",
      body: form,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!res.ok) {
      console.error("Cloudinary upload error:", {
        status: res.status,
        statusText: res.statusText,
        data: data,
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      });
      throw new Error(
        `Failed to upload image: ${res.status} ${res.statusText} - ${
          data?.error?.message || data
        }`
      );
    }

    console.log("Upload successful:", data.secure_url);
    return data.secure_url;
  };

  const handleMultipleImageUpload = async (
    files: FileList
  ): Promise<string[]> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    console.log("Multiple upload config:", { cloudName, uploadPreset });

    if (!cloudName || !uploadPreset) {
      console.warn(
        "Cloudinary not configured. Using placeholder URLs for testing."
      );
      // Return placeholder URLs for testing when Cloudinary is not configured
      return Array.from(files).map(
        (file, index) =>
          `https://via.placeholder.com/400x300/28bca2/ffffff?text=${encodeURIComponent(
            file.name
          )}`
      );
    }

    const uploads = Array.from(files).map(async (file) => {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", uploadPreset);

      console.log("Uploading file:", file.name, "Size:", file.size);

      const endpoint = getCloudinaryEndpoint(file, cloudName);
      const res = await fetch(endpoint, {
        method: "POST",
        body: form,
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) {
        console.error("Cloudinary upload error:", {
          status: res.status,
          statusText: res.statusText,
          data: data,
          fileName: file.name,
          fileSize: file.size,
          cloudName: cloudName,
          uploadPreset: uploadPreset,
        });
        throw new Error(
          `Failed to upload ${file.name}: ${res.status} ${res.statusText} - ${
            data?.error?.message || data
          }`
        );
      }

      console.log("Upload successful for:", file.name, data.secure_url);
      return data.secure_url;
    });

    return await Promise.all(uploads);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProject ? "PUT" : "POST";
    const url = editingProject
      ? `/api/projects/${editingProject.id}`
      : "/api/projects";

    // Clean images array
    const cleanedImages = formData.images.filter(
      (img) => img && img !== null && img !== ""
    );
    const payload = { ...formData, images: cleanedImages };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const saved = await res.json();
    if (res.ok) {
      if (editingProject) {
        setProjects(projects.map((p) => (p.id === saved.id ? saved : p)));
      } else {
        setProjects([saved, ...projects]);
      }
      resetForm();
    } else {
      alert("خطأ في حفظ المشروع");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const urls = await handleMultipleImageUpload(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert(
        `فشل في رفع الصور: ${
          error instanceof Error ? error.message : "خطأ غير معروف"
        }`
      );
    }
  };

  const removeImageField = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      category: "event-coverage",
      client: "",
      clientEn: "",
      date: "",
      images: [],
      featured: false,
      youtubeUrl: "", // <-- Added
    });
    setEditingProject(null);
    setIsFormOpen(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      titleEn: project.titleEn,
      description: project.description,
      descriptionEn: project.descriptionEn,
      category: project.category,
      client: project.client,
      clientEn: project.clientEn,
      date: project.date,
      images: project.images,
      featured: project.featured,
      youtubeUrl: project.youtubeUrl || "", // <-- Added
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        alert("تم حذف المشروع بنجاح!");
      } else {
        alert("خطأ في حذف المشروع");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">لوحة التحكم - إدارة المشاريع</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#28bca2] text-white"
          >
            <Plus className="mr-2" size={20} /> إضافة مشروع جديد
          </Button>
          <Button
            variant="outline"
            className="text-[#28bca2] border-[#28bca2]"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
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
            <Card key={project.id}>
              <CardContent className="p-0">
                <div className="relative h-48 flex items-center justify-center bg-white">
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Music size={64} className="text-[#28bca2] opacity-60" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-right">{project.title}</h3>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      onClick={() => handleEdit(project)}
                      size="sm"
                      variant="outline"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(project.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingProject ? "تعديل المشروع" : "إضافة مشروع"}
              </h2>
              <button onClick={resetForm}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="عنوان المشروع"
              />
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={(e) =>
                  setFormData({ ...formData, titleEn: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Title (English)"
              />
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="وصف المشروع"
              />
              <textarea
                required
                value={formData.descriptionEn}
                onChange={(e) =>
                  setFormData({ ...formData, descriptionEn: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Description (English)"
              />
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    فئة المشروع *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28bca2] focus:border-transparent text-right"
                  >
                    <option value="event-coverage">تغطية الفعاليات</option>
                    <option value="audio-production">إنتاج صوتي</option>
                    <option value="visual-production">إنتاج مرئي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    العميل (عربي) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28bca2] focus:border-transparent text-right"
                    placeholder="اسم العميل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientEn}
                    onChange={(e) =>
                      setFormData({ ...formData, clientEn: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28bca2] focus:border-transparent"
                    placeholder="Client name"
                  />
                </div>
              </div>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="رابط فيديو يوتيوب (اختياري)"
              />
              <div className="space-y-2">
                {formData.images.map((image, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="url"
                      required
                      value={image}
                      readOnly
                      className="flex-1 p-2 border rounded bg-gray-100"
                      placeholder="رابط الصورة"
                    />
                    {formData.images.length > 1 && (
                      <button
                        onClick={() => removeImageField(idx)}
                        type="button"
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <input
                  type="file"
                  accept="image/*,audio/*"
                  multiple
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  variant="outline"
                >
                  <Plus size={14} className="mr-1" /> إضافة صورة أو صوت
                </Button>
              </div>
              <Button type="submit" className="bg-[#28bca2] text-white">
                <Save className="mr-2" size={18} /> حفظ المشروع
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
