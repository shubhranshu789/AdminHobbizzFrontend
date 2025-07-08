"use client"

import { useState, useEffect , Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Calendar, Star, Loader2 } from "lucide-react"
import Image from "next/image"

import Navbar from "../../../Navbar/WelcomePageNavBar/page"
import Footer from "../../../Footer/page"

import { useSearchParams } from "next/navigation";

interface Competition {
  _id: string
  title: string
  desc: string
  pic: string
  postedBy: any[]
  Registrations: Array<{
    _id: string
    name: string
    email: string
  }>
  isLive: boolean
  uploads: Array<{
    _id: string
    pic: string
    uploadedBy: {
      _id: string
      name: string
      email: string
    }
    judge1?: number
    judge2?: number
    judge3?: number
    judge4?: number
    createdAt: string
    updatedAt: string
  }>
  judges: Array<{
    _id: string
    name: string
    email: string
  }>
  resultLive: boolean
  createdAt: string
  updatedAt: string
}


export default function WrappedPage() {
  return (
    <Suspense>
      <CompetitionResults />
    </Suspense>
  )
}




function CompetitionResults() {
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchCompetition = async () => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch competition data")
      }
      const data = await response.json()
      setCompetition(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCompetition()
    }
  }, [id])

  const calculateTotalScore = (upload: any) => {
    const scores = [upload.judge1, upload.judge2, upload.judge3, upload.judge4]
    return scores.filter((score) => score > 0).reduce((sum, score) => sum + score, 0)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Loading competition...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state
  if (error || !competition) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-red-500 mb-4">Error: {error || "Competition not found"}</p>
            <Button onClick={fetchCompetition} variant="outline">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const sortedUploads = [...competition.uploads].sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a))

  return (

    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Competition Header */}
        <Card>
            <CardHeader>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                <CardTitle className="text-3xl font-bold">{competition.title}</CardTitle>
                <CardDescription className="text-lg">{competition.desc}</CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {competition.Registrations?.length || 0} participants
                    </div>
                    <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(competition.createdAt).toLocaleDateString()}
                    </div>
                </div>
                </div>
                <div className="flex gap-2">
                <Badge variant={competition.isLive ? "default" : "secondary"}>
                    {competition.isLive ? "Live" : "Ended"}
                </Badge>
                <Badge variant={competition.resultLive ? "default" : "outline"}>
                    {competition.resultLive ? "Results Live" : "Results Pending"}
                </Badge>
                </div>
            </div>
            </CardHeader>
            {competition.pic && (
            <CardContent>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                    src={competition.pic || "/placeholder.svg"}
                    alt={competition.title}
                    fill
                    className="object-cover"
                />
                </div>
            </CardContent>
            )}
        </Card>

        {/* Results Section */}
        {competition.resultLive ? (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Competition Results
                </CardTitle>
                <CardDescription>Final rankings based on judge scores</CardDescription>
            </CardHeader>
            <CardContent>
                {competition.uploads && competition.uploads.length > 0 ? (
                <div className="space-y-4">
                    {sortedUploads.map((upload, index) => {
                    const totalScore = calculateTotalScore(upload)
                    const judgeScores = [upload.judge1, upload.judge2, upload.judge3, upload.judge4].filter(
                        (score) => score != null && score > 0
                    )

                    return (
                        <div
                        key={upload._id}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                            index === 0
                            ? "bg-yellow-50 border-yellow-200"
                            : index === 1
                                ? "bg-gray-50 border-gray-200"
                                : index === 2
                                ? "bg-orange-50 border-orange-200"
                                : "bg-white border-gray-100"
                        }`}
                        >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                            {index + 1}
                        </div>

                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image src={upload.pic || "/placeholder.svg"} alt="Submission" fill className="object-cover" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold">{upload.uploadedBy?.name || "Unknown"}</h3>
                            <p className="text-sm text-muted-foreground">{upload.uploadedBy?.email || ""}</p>
                            <p className="text-xs text-muted-foreground">
                            Submitted: {new Date(upload.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold text-lg">{totalScore}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                            {judgeScores.length > 0 ? `Judges: ${judgeScores.join(", ")}` : "No scores yet"}
                            </div>
                        </div>

                        {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                        </div>
                    )
                    })}
                </div>
                ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No submissions found for this competition.</p>
                </div>
                )}
            </CardContent>
            </Card>
        ) : (
            <Card>
            <CardContent className="text-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Results Not Available Yet</h3>
                <p className="text-muted-foreground">The competition results will be published once judging is complete.</p>
            </CardContent>
            </Card>
        )}

        {/* Judges Section */}
        {/* {competition.judges && competition.judges.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle>Judges Panel</CardTitle>
                <CardDescription>Meet the judges evaluating this competition</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competition.judges.map((judge) => (
                    <div key={judge._id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">{judge.name?.charAt(0).toUpperCase() || "?"}</span>
                    </div>
                    <div>
                        <p className="font-medium">{judge.name || "Unknown Judge"}</p>
                        <p className="text-sm text-muted-foreground">{judge.email || ""}</p>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        )} */}
        </div>

        <Footer/>
    </div>
  )
}
