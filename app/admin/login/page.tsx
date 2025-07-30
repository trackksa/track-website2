"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { admin, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    // If already logged in, redirect to admin dashboard
    if (admin) {
      router.push("/admin")
    }
  }, [admin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/admin")
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#28bca2]/5 to-transparent"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0">
          {[
            { icon: User, delay: "delay-100" },
            { icon: Lock, delay: "delay-200" },
            { icon: Mail, delay: "delay-300" },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`absolute opacity-5 text-[#28bca2] transition-all duration-1000 ${item.delay} ${
                  isVisible ? "translate-y-0 opacity-10" : "translate-y-10 opacity-0"
                }`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + (index % 2) * 40}%`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <Icon size={48} className="animate-pulse" />
              </div>
            )
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-[#28bca2]/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-[#28bca2]/20 rotate-45 animate-pulse"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-6 bg-[#28bca2] rounded-sm"></div>
                  <div className="w-2 h-4 bg-[#28bca2]/70 rounded-sm"></div>
                </div>
                <span className="text-gray-800 font-bold text-xl">Track</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the admin dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28bca2] focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28bca2] focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#28bca2] hover:bg-[#28bca2]/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-medium">Demo Credentials:</p>
              <p className="text-xs text-gray-500">Email: admin@soundbeat.com</p>
              <p className="text-xs text-gray-500">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
