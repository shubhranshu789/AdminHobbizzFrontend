"use client"

import { useState, useEffect , Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Tag, CheckCircle, XCircle, Loader2, Award } from "lucide-react"
import Image from "next/image"

import Navbar from "../../Navbar/WelcomePageNavBar/page"

import Footer from "../../Footer/page"

interface HallOfFameItem {
  _id: string
  pic: string
  uploadedBy: {
    _id: string
    name: string
    email: string
  }
  isApproved: boolean
  isHallofFame: boolean
  activityId: string
  activityTitle: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function WrappedPage() {
  return (
    <Suspense>
      <HallOfFame />
    </Suspense>
  )
}

 function HallOfFame() {
  const [hallOfFameItems, setHallOfFameItems] = useState<HallOfFameItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all")

  const fetchHallOfFame = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_USER}/hall-of-fame`)
      if (!response.ok) {
        throw new Error("Failed to fetch Hall of Fame data")
      }
      const data = await response.json()
      setHallOfFameItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHallOfFame()
  }, [])

  const filteredItems = hallOfFameItems.filter((item) => {
    if (filter === "approved") return item.isApproved
    if (filter === "pending") return !item.isApproved
    return true
  })

  const approvedCount = hallOfFameItems.filter((item) => item.isApproved).length
  const pendingCount = hallOfFameItems.filter((item) => !item.isApproved).length

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2 text-primary" />
            <span>Loading Hall of Fame...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={fetchHallOfFame} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (

    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              Hall of Fame
            </h1>
            <Award className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the most outstanding submissions and achievements from our community
          </p>
        </div>

        {/* Stats and Filters */}
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hallOfFameItems.length}</div>
                  <div className="text-sm text-muted-foreground">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
                  All
                </Button>
                <Button
                  variant={filter === "approved" ? "default" : "outline"}
                  onClick={() => setFilter("approved")}
                  size="sm"
                >
                  Approved
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  onClick={() => setFilter("pending")}
                  size="sm"
                >
                  Pending
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Hall of Fame Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={item.pic || "/placeholder.svg"}
                      alt={item.activityTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Status Badge */}
                  {/* <div className="absolute top-3 right-3">
                    <Badge
                      variant={item.isApproved ? "default" : "secondary"}
                      className={`${
                        item.isApproved ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                      } text-white`}
                    >
                      {item.isApproved ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {item.isApproved ? "Approved" : "Pending"}
                    </Badge>
                  </div> */}

                  {/* Hall of Fame Badge */}
                  {item.isHallofFame && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary hover:bg-primary-600 text-white">
                        <Trophy className="h-3 w-3 mr-1" />
                        Hall of Fame
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{item.activityTitle}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    <span className="capitalize">{item.category}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Uploader Info */}
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary text-sm">
                          {item.uploadedBy?.name?.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.uploadedBy?.name || "Unknown User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.uploadedBy?.email || ""}</p>
                      </div>
                    </div>

                    {/* Date Info */}
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      {item.updatedAt !== item.createdAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Items Found</h3>
              <p className="text-muted-foreground">
                {filter === "all" ? "No items in the Hall of Fame yet." : `No ${filter} items found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer/>
    </div>

  )
}
