"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onFileUploaded: (fileUrl: string, filename: string, fileSize: number) => void
  onFileRemoved: () => void
  currentFile?: {
    url: string
    filename: string
    fileSize: number
  }
  fileType: "cv" | "resume"
  maxSizeMB?: number
  acceptedTypes?: string[]
}

const FileUpload = ({
  onFileUploaded,
  onFileRemoved,
  currentFile,
  fileType,
  maxSizeMB = 10,
  acceptedTypes = [".pdf", ".doc", ".docx"]
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    // Validate file type
    const fileExtension = "." + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      setUploadError(`File type must be one of: ${acceptedTypes.join(", ")}`)
      return
    }

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadError("")
    setUploadSuccess(false)

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      console.log("User check result:", { user, userError })
      
      if (userError) {
        console.error("Auth error:", userError)
        throw new Error(`Authentication error: ${userError.message}`)
      }
      
      if (!user) {
        console.error("No user found")
        throw new Error("You must be logged in to upload files")
      }

      // Create unique filename with timestamp
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop()
      const uniqueFilename = `${fileType}_${user.id}_${timestamp}.${fileExtension}`
      const filePath = `${user.id}/${uniqueFilename}`

      // Upload file to Supabase Storage
      console.log("Uploading file to path:", filePath)
      const { data, error } = await supabase.storage
        .from('candidate-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      console.log("Upload result:", { data, error })

      if (error) {
        console.error("Upload error:", error)
        throw new Error(`Upload failed: ${error.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('candidate-files')
        .getPublicUrl(filePath)

      console.log("URL data:", urlData)

      if (!urlData.publicUrl) {
        throw new Error("Failed to get file URL")
      }

      // Call the callback with file details
      onFileUploaded(urlData.publicUrl, file.name, file.size)
      setUploadSuccess(true)
      
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = async () => {
    if (!currentFile) return

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Extract file path from URL
      const url = new URL(currentFile.url)
      const pathParts = url.pathname.split('/')
      const filePath = pathParts.slice(-2).join('/') // Get user_id/filename

      // Delete file from storage
      const { error } = await supabase.storage
        .from('candidate-files')
        .remove([filePath])

      if (error) {
        console.error("Delete error:", error)
      }

      onFileRemoved()
      setUploadSuccess(false)
      
    } catch (error) {
      console.error("Remove error:", error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <Label htmlFor={`${fileType}-upload`} className="text-sm font-medium">
        Upload CV (PDF, DOC, DOCX)
      </Label>
      
      {currentFile ? (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {currentFile.filename}
                </p>
                <p className="text-xs text-green-600">
                  {formatFileSize(currentFile.fileSize)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(currentFile.url, '_blank')}
                className="text-blue-600 hover:text-blue-700"
              >
                <File className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {acceptedTypes.join(", ")} up to {maxSizeMB}MB
          </p>
          <Input
            ref={fileInputRef}
            id={`${fileType}-upload`}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </>
            )}
          </Button>
        </div>
      )}

      {uploadError && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && !currentFile && (
        <div className="flex items-center space-x-2 text-green-600 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>File uploaded successfully!</span>
        </div>
      )}
    </div>
  )
}

export default FileUpload
