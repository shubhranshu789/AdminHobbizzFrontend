"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import Image from "next/image"

import Navbar from "../../PrincipleNavBar/page"

import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast"


import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, User, Calendar, Star } from "lucide-react"

interface Competition {
  _id: string
  title: string
  desc: string
  pic: string
  postedBy: string[]
  isLive: boolean
}

interface CompetitionDisplayProps {
  competitionId: string
  apiBaseUrl?: string
}

type Judge = {
  _id: string;
  name: string;
  email: string;
  password: string;
  clubName: string;
  ip: string;
  __v: number;
};


interface ContestResult {
  uploadId: string
  pic: string
  totalScore: number
  breakdown: {
    judge1: number
    judge2: number
    judge3: number
    judge4: number
  }
  uploadedBy: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  rank: number
}

function ParticularCompitionInner() {
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ContestResult[]>([])


  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [success, setSuccess] = useState(false);


  const [judges, setJudges] = useState<Judge[]>([]);
  const [assignedJudges, setAssignedJudges] = useState<Judge[]>([]);
  const [selectedJudge, setSelectedJudge] = useState<string>("");

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allJudges`); // adjust if needed
        const data = await res.json();
        setJudges(data);
      } catch (err) {
        console.error("Failed to fetch judges:", err);
      }
    };


    // const fetchAssignedJudges = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competition/${id}`); // make sure this route returns populated judges
    //   const data = await res.json();
    //   setAssignedJudges(data.judges || []);
    // };

    fetchJudges();
    // fetchAssignedJudges();


    const fetchAssignedJudges = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competition/${id}/judges`);
        const data = await res.json();
        setAssignedJudges(data.judges);
      } catch (err) {
        console.error("Failed to fetch assigned judges", err);
      }
    };

    fetchAssignedJudges();
  }, []);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCompitition/${id}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setCompetition(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch competition")
        console.error("Error fetching competition:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCompetition()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading competition...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <h3 className="text-lg font-semibold mb-2">Error Loading Competition</h3>
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!competition) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            <h3 className="text-lg font-semibold mb-2">Competition Not Found</h3>
            <p>No competition data available.</p>
          </div>
        </CardContent>
      </Card>
    )
  }


  const toggleLive = async (value: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activity/set-live/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLive: value }),
    });

    const data = await res.json();
    console.log(data.message);
  };

  const handleAssignJudge = async (judgeId: any) => {
    if (!judgeId) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignJudge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, judgeId }),
    });

    const data = await res.json();

    if (res.ok) {
      setAssignedJudges(data.competition.judges); // update UI
      setSelectedJudge(""); // reset selection
    } else {
      alert(data.error || "Failed to assign judge");
    }
  };


  const handleRemoveJudge = async (judgeId: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/removeJudge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id, // make sure this variable is available in your component
          judgeId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAssignedJudges(data.competition.judges); // update the list after deletion
      } else {
        alert(data.error || "Failed to remove judge");
      }
    } catch (err) {
      console.error("Error removing judge:", err);
      alert("Something went wrong");
    }
  };



  const generateResults = async (id: any) => {
    setLoading(true)
    setError(null)

    try {
      // Replace with your actual contest ID
      // const contestId = "685828ce20a1a9e01b628608"
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}/results`)

      if (!response.ok) {
        throw new Error("Failed to fetch results")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}/generate-result`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to generate result");

      setSuccess(true);
      console.log("Result Live:", data.resultLive);
    } catch (err) {
      console.error("Error:");
      // setError(err.message);
    } finally {
      setLoading(false);
    }




  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600"
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  }


  return (
    <div style={{ marginTop: "60px" }}>
      <Navbar />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{competition.title}</CardTitle>
            <Badge variant={competition.isLive ? "default" : "secondary"}>
              {competition.isLive ? "🔴 Live" : "⏸️ Not Live"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {competition.pic && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={competition.pic || "/placeholder.svg"}
                alt={competition.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{competition.desc}</p>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => toggleLive(true)}
              className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-all duration-200"
            >
              ✅ Make Live
            </button>

            <button
              onClick={() => toggleLive(false)}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow transition-all duration-200"
            >
              ❌ Make Offline
            </button>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Select Judge</label>
            <select
              value={selectedJudge}
              onChange={(e) => {
                const judgeId = e.target.value;
                setSelectedJudge(judgeId);
                handleAssignJudge(judgeId);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a Judge --</option>
              {judges
                .filter((j) => !assignedJudges.find((aj) => aj._id === j._id)) // filter out already assigned
                .map((judge) => (
                  <option key={judge._id} value={judge._id}>
                    {judge.name} ({judge.clubName})
                  </option>
                ))}
            </select>

            {/* Display Assigned Judges */}
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Assigned Judges:</h4>

              {assignedJudges && assignedJudges.length > 0 ? (
                <ul className="space-y-2">
                  {assignedJudges.map((judge) => (
                    <li
                      key={judge._id}
                      className="flex justify-between items-center border p-3 rounded-md bg-gray-50 text-sm"
                    >
                      <div>
                        <p className="font-medium">{judge.name}</p>
                        <p className="text-gray-500">{judge.clubName}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveJudge(judge._id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No judges assigned yet.</p>
              )}
            </div>


          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
            <span>Competition ID: {competition._id}</span>
            {/* <span>Posted by: {competition.postedBy.length} user(s)</span> */}

            {/* <button>Generate Result</button> */}
          </div>
        </CardContent>
      </Card>


      <div>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Contest Results</h1>
            <Button
              onClick={() => generateResults(id)}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? "Generating Results..." : "Generate Result"}
            </Button>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-600 text-center">Error: {error}</p>
              </CardContent>
            </Card>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-center mb-6">🏆 Leaderboard</h2>

              {results.map((result) => (
                <Card
                  key={result.uploadId}
                  className={`relative overflow-hidden ${result.rank <= 3 ? "ring-2 ring-offset-2" : ""} ${result.rank === 1
                    ? "ring-yellow-400"
                    : result.rank === 2
                      ? "ring-gray-400"
                      : result.rank === 3
                        ? "ring-amber-400"
                        : ""
                    }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${getRankColor(result.rank)}`} />

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getRankIcon(result.rank)}
                        <div>
                          <CardTitle className="text-lg">{result.uploadedBy.name}</CardTitle>
                          <p className="text-sm text-gray-500">{result.uploadedBy.email}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        {result.totalScore} pts
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Image */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Submission</h4>
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={result.pic || "/placeholder.svg"}
                            alt={`Submission by ${result.uploadedBy.name}`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=300&width=300"
                            }}
                          />
                        </div>
                      </div>

                      {/* Scores and Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Judge Scores</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(result.breakdown).map(([judge, score]) => (
                              <div key={judge} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="text-sm capitalize">{judge.replace("judge", "Judge ")}</span>
                                <Badge variant={score > 0 ? "default" : "secondary"}>{score}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: {new Date(result.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>ID: {result.uploadId}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {results.length === 0 && !loading && !error && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Click "Generate Result" to view the contest leaderboard</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>

  )
}

export default function ParticularCompitionPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <ParticularCompitionInner />
    </Suspense>
  );
}
