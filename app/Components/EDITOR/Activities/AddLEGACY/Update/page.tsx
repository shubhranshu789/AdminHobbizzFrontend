"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Loader2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"


// import "../../../../../Components/EDITOR/Activities/AddLEGACY"

interface Legacy {
  _id: string
  title: string
  category: "Traditional Art" | "Modern Art" | "Sculpture" | "Photography" | "Other"
  origin: string
  imageUrl: string
  description: string
  period: string
  tags: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

 function UpdateLegacyinner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const { toast } = useToast()
  const legacyId = searchParams.get("id")

  const [legacy, setLegacy] = useState<Legacy | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newTag, setNewTag] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    category: "Other" as Legacy["category"],
    origin: "",
    imageUrl: "",
    description: "",
    period: "Ancient - Present",
    tags: [] as string[],
  })

  // Category options based on your schema enum
  const categoryOptions = [
    { value: "Traditional Art", label: "Traditional Art" },
    { value: "Modern Art", label: "Modern Art" },
    { value: "Sculpture", label: "Sculpture" },
    { value: "Photography", label: "Photography" },
    { value: "Other", label: "Other" },
  ]

  // Fetch existing legacy data
  useEffect(() => {
    const fetchLegacy = async () => {
      if (!legacyId) {
        // toast({
        //   title: "Error",
        //   description: "No legacy ID provided",
        //   variant: "destructive",
        // })
        router.push("/legacy")
        return
      }

      try {
        // Replace with your actual fetch endpoint for getting a single legacy item
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artLEGACY/${legacyId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch legacy")
        }

        const data = await response.json()
        setLegacy(data)
        setFormData({
          title: data.title,
          category: data.category,
          origin: data.origin,
          imageUrl: data.imageUrl,
          description: data.description,
          period: data.period,
          tags: data.tags,
        })
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to load legacy data",
        //   variant: "destructive",
        // })
        console.error("Error fetching legacy:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLegacy()
  }, [legacyId, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club-legacy-update/${legacyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update legacy")
      }

      const result = await response.json()

      // toast({
      //   title: "Success",
      //   description: "Legacy updated successfully!",
      // })

      // Optionally redirect to legacy detail page or legacy list
      router.push(`/Components/EDITOR/Activities/AddLEGACY`)
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update legacy. Please try again.",
      //   variant: "destructive",
      // })
      console.error("Error updating legacy:", error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!legacy) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Legacy Not Found</CardTitle>
            <CardDescription>The requested legacy item could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/legacy")} className="w-full">
              Back to Legacy
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Update Legacy</CardTitle>
          <CardDescription>Edit your legacy item details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter legacy title"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Origin */}
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => handleInputChange("origin", e.target.value)}
                placeholder="Enter origin location or culture"
                required
              />
            </div>

            {/* Period */}
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => handleInputChange("period", e.target.value)}
                placeholder="e.g., Ancient - Present, 15th Century, Modern Era"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="https://example.com/legacy-image.jpg"
                required
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Legacy Preview"
                    className="max-w-xs h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the legacy item, its significance, history, and cultural importance..."
                className="min-h-[150px]"
                required
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag (e.g., ancient, cultural, historical)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                    <span>{tag}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeTag(tag)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={updating} className="flex-1">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Legacy"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}



export default function UpdateLegacy() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <UpdateLegacyinner />
    </Suspense>
  );
}
