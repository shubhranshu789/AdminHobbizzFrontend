"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  ChevronDown,
  Palette,
  Brush,
  Camera,
  Trophy,
  Calendar,
  Users,
  Star,
  Heart,
  Eye,
  Upload,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Award,
  PaintBucket,
  ImageIcon,
  Clock,
} from "lucide-react"

import Navbar from "../../Navbar/page"


// import "../../../Components/Views/Affairs"
// import "../../../Components/Views/Contest"
// import "../../../Components/Views/HallOfFame"



export default function ArtClubHomepage() {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [artworkCount, setArtworkCount] = useState(0)
  const [eventCount, setEventCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const router = useRouter();

  useEffect(() => {
    // Page load animation
    setIsLoaded(true)

    // Animate counters
    const animateCounter = (setter: (value: number) => void, target: number) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(current))
        }
      }, 30)
    }

    setTimeout(() => {
      animateCounter(setMemberCount, 250)
      animateCounter(setArtworkCount, 1200)
      animateCounter(setEventCount, 45)
    }, 1000)

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    // Observe all sections
    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])


  const goToHeritage = () => {
    router.push("/CraftClub/Views/Heritage");
  }
  const goToGallery = () => {
    router.push("/CraftClub/Views/Gallery");
  }
  const goToAffair = () => {
    router.push("/CraftClub/Views/Affairs");
  }
  const goToCopition = () => {
    router.push("/CraftClub/Views/Contest");
  }
  const goToHallofFame = () => {
    router.push("/CraftClub/Views/HallOfFame");
  }


  const events = [
    { id: 1, title: "Digital Art Workshop", date: "2024-01-15", time: "2:00 PM", type: "Workshop" },
    { id: 2, title: "Spring Art Exhibition", date: "2024-01-22", time: "10:00 AM", type: "Exhibition" },
    { id: 3, title: "Portrait Drawing Contest", date: "2024-01-28", time: "3:00 PM", type: "Contest" },
    { id: 4, title: "Art Therapy Session", date: "2024-02-05", time: "4:00 PM", type: "Session" },
  ]

  const cabinetMembers = [
    { name: "Dr. Maya Patel", role: "Director", image: "/avatars/1.JPG?height=200&width=200" },
    { name: "Prof. James Wilson", role: "Advisor", image: "/avatars/2.JPG?height=200&width=200" },
    { name: "Sophia Rodriguez", role: "Editor", image: "/avatars/3.JPG?height=200&width=200" },
  ]

  const artForms = [
    {
      name: "Madhubani",
      description: "Traditional folk art from Bihar, known for intricate patterns and vibrant colors.",
      image: "/images/Madhubani.jpeg?height=200&width=300",
    },
    {
      name: "Warli",
      description: "Ancient tribal art form using simple geometric shapes to depict daily life.",
      image: "/images/warli.JPG?height=200&width=300",
    },
    {
      name: "Tanjore",
      description: "Classical South Indian painting style with rich colors and gold foil.",
      image: "/images/Tanjore.JPG?height=200&width=300",
    },
  ]


  const GoToArtAuthPage = () => {
    router.push("/CraftClub/Auth/SignIn")
  }
  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ userSelect: "text" }}>
      {/* Page Load Animation Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex items-center justify-center transition-all duration-1000 ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 animate-spin">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600 animate-pulse">Loading Art Club...</h2>
        </div>
      </div>

      {/* Artistic Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-blue-600 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-400 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-700 rounded-full blur-lg animate-pulse"></div>
      </div>

      {/* Navbar */}
      <nav
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 2rem" }}
        className={`relative z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 shadow-lg transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Logo */}
        <img src="/LOGO.png" alt="Logo" className="h-10" />

        {/* Join Club Button */}
        <button
          className="px-5 py-2 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: "#1447e6" }}
          onClick={() => { GoToArtAuthPage() }}
        >
          Join Club
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className={`relative py-32 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="hero-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">🎨 Welcome to Art Club</Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-blue-600 animate-pulse">Color Your</span>{" "}
                  <span className="text-blue-700 animate-pulse">Imagination.</span>
                  <br />
                  <span className="text-black">Create Your Legacy.</span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ userSelect: "text" }}>
                  Join a vibrant community of young artists where creativity knows no bounds. Express yourself through
                  colors, shapes, and imagination.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  // onClick={() => {
                  //   document.getElementById("join-section")?.scrollIntoView({ behavior: "smooth" })
                  // }}
                  onClick={() => { GoToArtAuthPage() }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Join the Art Club
                </Button>

              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 -mr-24">
                <Image
                  src="/images/art-studio.png"
                  alt="Artist painting"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section
        className={`py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-1000 ${visibleSections.has("stats-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="stats-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-lg hover:bg-blue-500/30 border-2 border-transparent hover:border-blue-300">
              <div className="text-4xl font-bold">{memberCount}+</div>
              <div className="text-blue-100">Active Members</div>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-lg hover:bg-blue-500/30 border-2 border-transparent hover:border-blue-300">
              <div className="text-4xl font-bold">{artworkCount}+</div>
              <div className="text-blue-100">Artworks Created</div>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-lg hover:bg-blue-500/30 border-2 border-transparent hover:border-blue-300">
              <div className="text-4xl font-bold">{eventCount}+</div>
              <div className="text-blue-100">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Art Club */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${visibleSections.has("about-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        id="about-section"
        data-animate
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">About Our Art Club</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ userSelect: "text" }}>
              Our mission is to help students explore and express their creativity through painting, sketching, digital
              art, and various other artistic mediums.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card onClick={() => {goToHeritage()}} className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <Brush className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">Traditional Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" style={{ userSelect: "text" }}>
                  Master the fundamentals with painting, sketching, and classical techniques.
                </p>
              </CardContent>
            </Card>

            <Card onClick={() => {goToGallery()}} className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <Camera className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">Digital Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" style={{ userSelect: "text" }}>
                  Explore modern digital tools and create stunning digital masterpieces.
                </p>
              </CardContent>
            </Card>

            <Card onClick={() => {goToAffair()}} className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" style={{ userSelect: "text" }}>
                  Connect with fellow artists and grow together in a supportive environment.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Famous Artists Inspiration */}
          <div className="bg-blue-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-black">Draw Inspiration from the Masters</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Palette className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Pablo Picasso</h4>
                <p className="text-sm text-gray-700">Cubism Pioneer</p>
              </div>
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Brush className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Leonardo da Vinci</h4>
                <p className="text-sm text-gray-700">Renaissance Master</p>
              </div>
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Vincent van Gogh</h4>
                <p className="text-sm text-gray-700">Post-Impressionist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Cabinet */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ${visibleSections.has("cabinet-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="cabinet-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Meet Our Leadership</span>
            </h2>
            <p className="text-xl text-gray-700" style={{ userSelect: "text" }}>
              Dedicated mentors guiding your artistic journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cabinetMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="rounded-full object-cover mx-auto border-4 border-blue-200"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2" style={{ userSelect: "text" }}>
                    {member.name}
                  </h3>
                  <Badge className="bg-blue-600 text-white">{member.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy & Heritage */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${visibleSections.has("heritage-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="heritage-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Art Forms & Heritage</span>
            </h2>
            <p className="text-xl text-gray-700" style={{ userSelect: "text" }}>
              Celebrating traditional Indian art forms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {artForms.map((artForm, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30"
              >
                <CardContent className="p-0">
                  <Image
                    src={artForm.image || "/placeholder.svg"}
                    alt={artForm.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3" style={{ userSelect: "text" }}>
                      {artForm.name}
                    </h3>
                    <p className="text-gray-700" style={{ userSelect: "text" }}>
                      {artForm.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {/* <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ${visibleSections.has("gallery-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        id="gallery-section"
        data-animate
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Student Gallery</span>
            </h2>
            <p className="text-xl text-gray-700" style={{ userSelect: "text" }}>
              Showcasing amazing artwork from our talented students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Card
                key={artwork.id}
                className="group bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() => {
                  window.open(`/gallery/${artwork.id}`, "_blank")
                }}
              >
                <CardContent className="p-0 relative">
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center border-2 border-transparent group-hover:border-blue-400">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                      <p className="font-semibold">View Full</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-black mb-1" style={{ userSelect: "text" }}>
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-2" style={{ userSelect: "text" }}>
                      by {artwork.artist}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-700">{artwork.likes}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Featured
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white px-8 py-3 rounded-full text-lg font-semibold"
              onClick={() => {
                window.open("/gallery", "_blank")
              }}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              View Full Gallery
            </Button>
          </div>
        </div>
      </section> */}

      {/* Upcoming Events */}


      {/* Contests & Activities */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ${visibleSections.has("contests-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="contests-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">Contests & Activities</span>
            </h2>
            <p className="text-xl text-gray-700" style={{ userSelect: "text" }}>
              Showcase your talent and win amazing prizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card onClick={() => {goToCopition()}} className="bg-white hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Trophy className="w-8 h-8 text-blue-600" />
                  {/* <Badge className="bg-blue-600 text-white">Active</Badge> */}
                </div>
                <CardTitle className="text-black">Monthly Art Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Theme: "Nature's Beauty" - Create artwork inspired by nature
                </p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600">Ends in 12 days</span> */}
                  {/* <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white"
                    onClick={() => {
                      alert("Redirecting to contest submission page...")
                    }}
                  >
                    Participate
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            <Card onClick={() => {goToHallofFame()}} className="bg-white hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Award className="w-8 h-8 text-blue-600" />
                  {/* <Badge className="bg-blue-600 text-white">Weekly</Badge> */}
                </div>
                <CardTitle className="text-black">Artist of the Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Get featured and win exclusive art supplies
                </p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600">New winner every Monday</span> */}
                  {/* <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white"
                    onClick={() => {
                      alert("Redirecting to contest submission page...")
                    }}
                  >
                    Submit
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                  <Badge className="bg-blue-600 text-white">Special</Badge>
                </div>
                <CardTitle className="text-black">Digital Art Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Annual exhibition of best digital artworks
                </p>
                <div className="flex items-center justify-between">
                  {/* <span className="text-sm text-gray-600">Submissions open</span> */}
                  {/* <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white"
                    onClick={() => {
                      alert("Redirecting to contest submission page...")
                    }}
                  >
                    Apply
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer
        className={`bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("footer-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        data-animate
        id="footer-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ userSelect: "text" }}>
                    EduBiz Network
                  </div>
                  <div className="text-sm text-blue-200" style={{ userSelect: "text" }}>
                    HOBBIZZ Platform
                  </div>
                </div>
              </div>
              <p className="text-blue-200" style={{ userSelect: "text" }}>
                Empowering students to explore their creative potential through art and community.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4" style={{ userSelect: "text" }}>
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link href="#" className="block text-blue-200 hover:text-white transition-colors">
                  About Club
                </Link>
                <Link href="#" className="block text-blue-200 hover:text-white transition-colors">
                  Art Gallery
                </Link>
                <Link href="#" className="block text-blue-200 hover:text-white transition-colors">
                  Events
                </Link>
                <Link href="#" className="block text-blue-200 hover:text-white transition-colors">
                  Contests
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4" style={{ userSelect: "text" }}>
                Contact Info
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-200">
                  <Mail className="w-4 h-4" />
                  <span style={{ userSelect: "text" }}>artclub@edubiz.com</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <Phone className="w-4 h-4" />
                  <span style={{ userSelect: "text" }}>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span style={{ userSelect: "text" }}>Mumbai, India</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4" style={{ userSelect: "text" }}>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 border-2 border-transparent hover:border-blue-300"
                  onClick={() => window.open("https://facebook.com/artclub", "_blank")}
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 border-2 border-transparent hover:border-blue-300"
                  onClick={() => window.open("https://instagram.com/artclub", "_blank")}
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 border-2 border-transparent hover:border-blue-300"
                  onClick={() => window.open("https://twitter.com/artclub", "_blank")}
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p style={{ userSelect: "text" }}>
              &copy; 2024 EduBiz Network. All rights reserved. | Art Club - HOBBIZZ Platform
            </p>
          </div>
        </div>
      </footer>


    </div>
  )
}
