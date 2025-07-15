"use client"

import type React from "react"

import { useState, useEffect , Suspense } from "react"
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

// import "../../../../../Components/EDITOR/Activities/AddHeritage"

interface Heritage {
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

 function UpdateHeritageinner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const { toast } = useToast()
  const heritageId = searchParams.get("id")

  const [heritage, setHeritage] = useState<Heritage | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newTag, setNewTag] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    category: "Other" as Heritage["category"],
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

  // Fetch existing heritage data
  useEffect(() => {
    const fetchHeritage = async () => {
      if (!heritageId) {
        // toast({
        //   title: "Error",
        //   description: "No heritage ID provided",
        //   variant: "destructive",
        // })
        router.push("/heritage")
        return
      }

      try {
        // Replace with your actual fetch endpoint for getting a single heritage item
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artHeritage/${heritageId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch heritage")
        }

        const data = await response.json()
        setHeritage(data)
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
        //   description: "Failed to load heritage data",
        //   variant: "destructive",
        // })
        console.error("Error fetching heritage:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeritage()
  }, [heritageId, router])

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club-heritage-update/${heritageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update heritage")
      }

      const result = await response.json()

      // toast({
      //   title: "Success",
      //   description: "Heritage updated successfully!",
      // })

      // Optionally redirect to heritage detail page or heritage list
      router.push(`/Components/EDITOR/Activities/AddHeritage`)
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update heritage. Please try again.",
      //   variant: "destructive",
      // })
      console.error("Error updating heritage:", error)
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

  if (!heritage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Heritage Not Found</CardTitle>
            <CardDescription>The requested heritage item could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/heritage")} className="w-full">
              Back to Heritage
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
          <CardTitle>Update Heritage</CardTitle>
          <CardDescription>Edit your heritage item details</CardDescription>
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
                placeholder="Enter heritage title"
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
                placeholder="https://example.com/heritage-image.jpg"
                required
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Heritage Preview"
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
                placeholder="Describe the heritage item, its significance, history, and cultural importance..."
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
                  "Update Heritage"
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


export default function UpdateHeritage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <UpdateHeritageinner />
    </Suspense>
  );
}