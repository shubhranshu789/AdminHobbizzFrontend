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
import { Switch } from "@/components/ui/switch"
import { X, Plus, Loader2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// import "../../../../../Components/EDITOR/Activities/ArtNews"

interface News {
  _id: string
  title: string
  content: string
  category: "Achievements" | "Notices" | "Events" | "Press Coverage" | "Other"
  author: string
  imageUrl: string
  tags: string[]
  publishedAt: string
  isFeatured: boolean
  __v: number
}

 function UpdateNewsinner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const { toast } = useToast()
  const newsId = searchParams.get("id")

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newTag, setNewTag] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Other" as News["category"],
    author: "Art Club Team",
    imageUrl: "",
    tags: [] as string[],
    isFeatured: false,
    publishedAt: "",
  })

  // Category options based on your schema enum
  const categoryOptions = [
    { value: "Achievements", label: "Achievements" },
    { value: "Notices", label: "Notices" },
    { value: "Events", label: "Events" },
    { value: "Press Coverage", label: "Press Coverage" },
    { value: "Other", label: "Other" },
  ]

  // Fetch existing news data
  useEffect(() => {
    const fetchNews = async () => {
      if (!newsId) {
        // toast({
        //   title: "Error",
        //   description: "No news ID provided",
        //   variant: "destructive",
        // })
        router.push("/news")
        return
      }

      try {
        // Replace with your actual fetch endpoint for getting a single news item
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artNews/${newsId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data = await response.json()
        setNews(data)
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category,
          author: data.author,
          imageUrl: data.imageUrl,
          tags: data.tags,
          isFeatured: data.isFeatured,
          publishedAt: data.publishedAt,
        })
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to load news data",
        //   variant: "destructive",
        // })
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [newsId, router])

  const handleInputChange = (field: string, value: string | boolean) => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club-news-update/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update news")
      }

      const result = await response.json()

      // toast({
      //   title: "Success",
      //   description: "News updated successfully!",
      // })

      // Optionally redirect to news detail page or news list
      router.push(`/Components/EDITOR/Activities/ArtNews`)
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update news. Please try again.",
      //   variant: "destructive",
      // })
      console.error("Error updating news:", error)
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

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>News Not Found</CardTitle>
            <CardDescription>The requested news item could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/news")} className="w-full">
              Back to News
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
          <CardTitle>Update News</CardTitle>
          <CardDescription>Edit your news article details</CardDescription>
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
                placeholder="Enter news title"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
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

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Write your news content here..."
                className="min-h-[200px]"
                required
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
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-xs h-32 object-cover rounded-md border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag (e.g., students, awards)"
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

            {/* Published Date */}
            <div className="space-y-2">
              <Label htmlFor="publishedAt">Published Date</Label>
              <Input
                id="publishedAt"
                type="datetime-local"
                value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ""}
                onChange={(e) => handleInputChange("publishedAt", e.target.value)}
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
              />
              <Label htmlFor="featured">Featured Article</Label>
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
                  "Update News"
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


export default function UpdateNews() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <UpdateNewsinner />
    </Suspense>
  );
}
