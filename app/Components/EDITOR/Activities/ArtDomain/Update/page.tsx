"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"


// import "../../../../../Components/EDITOR/Activities/ArtDomain"

interface Domain {
  _id: string
  title: string
  content: string
  author: string
  imageUrl: string
  publishedAt: string
  __v: number
}

 function UpdateDomaininner() {
  const router = useRouter()
  const searchParams = useSearchParams()
//   const { toast } = useToast()
  const domainId = searchParams.get("id")

  const [domain, setDomain] = useState<Domain | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Art Club Team",
    imageUrl: "",
    publishedAt: "",
  })

  // Fetch existing domain data
  useEffect(() => {
    const fetchDomain = async () => {
      if (!domainId) {
        // toast({
        //   title: "Error",
        //   description: "No domain ID provided",
        //   variant: "destructive",
        // })
        router.push("/domains")
        return
      }

      try {
        // Replace with your actual fetch endpoint for getting a single domain item
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artDomain/${domainId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch domain")
        }

        const data = await response.json()
        setDomain(data)
        setFormData({
          title: data.title,
          content: data.content,
          author: data.author,
          imageUrl: data.imageUrl,
          publishedAt: data.publishedAt,
        })
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to load domain data",
        //   variant: "destructive",
        // })
        console.error("Error fetching domain:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDomain()
  }, [domainId, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club-domain-update/${domainId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update domain")
      }

      const result = await response.json()

    //   toast({
    //     title: "Success",
    //     description: "Domain updated successfully!",
    //   })

      // Optionally redirect to domain detail page or domains list
      router.push(`/Components/EDITOR/Activities/ArtDomain`)
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to update domain. Please try again.",
    //     variant: "destructive",
    //   })
      console.error("Error updating domain:", error)
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

  if (!domain) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Domain Not Found</CardTitle>
            <CardDescription>The requested domain item could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/domains")} className="w-full">
              Back to Domains
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
          <CardTitle>Update Domain</CardTitle>
          <CardDescription>Edit your domain content details</CardDescription>
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
                placeholder="Enter domain title"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Link</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Write your domain content here..."
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

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={updating} className="flex-1">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Domain"
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



export default function UpdateDoma() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <UpdateDomaininner />
    </Suspense>
  );
}
