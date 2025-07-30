import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get("admin-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    // Validate file count (max 10 files)
    if (files.length > 10) {
      return NextResponse.json({ error: "Too many files. Maximum 10 files allowed." }, { status: 400 })
    }

    const uploadPromises = files.map(async (file) => {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type for ${file.name}. Only images are allowed.`)
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`)
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Upload to Cloudinary
      return uploadToCloudinary(buffer, "soundbeat/projects")
    })

    const results = await Promise.all(uploadPromises)

    return NextResponse.json({
      success: true,
      uploads: results.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      })),
    })
  } catch (error) {
    console.error("Multiple upload error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 })
  }
}
