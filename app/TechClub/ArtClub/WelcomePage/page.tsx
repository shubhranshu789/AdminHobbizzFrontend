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



export default function TechClubHomepage() {
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [techworkCount, setTechworkCount] = useState(0)
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
      animateCounter(setTechworkCount, 1200)
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
    router.push("/TechClub/Views/Heritage");
  }
  const goToGallery = () => {
    router.push("/TechClub/Views/Gallery");
  }
  const goToAffair = () => {
    router.push("/TechClub/Views/Affairs");
  }
  const goToCopition = () => {
    router.push("/TechClub/Views/Contest");
  }
  const goToHallofFame = () => {
    router.push("/TechClub/Views/HallOfFame");
  }


  const events = [
    { id: 1, title: "Digital Tech Workshop", date: "2024-01-15", time: "2:00 PM", type: "Workshop" },
    { id: 2, title: "Spring Tech Exhibition", date: "2024-01-22", time: "10:00 AM", type: "Exhibition" },
    { id: 3, title: "Portrait Drawing Contest", date: "2024-01-28", time: "3:00 PM", type: "Contest" },
    { id: 4, title: "Tech Therapy Session", date: "2024-02-05", time: "4:00 PM", type: "Session" },
  ]

  const cabinetMembers = [
    { name: "Sundar Pichai", role: "Director", image: "/avatars/1.JPG?height=200&width=200" },
    { name: "Elon Musk", role: "Advisor", image: "/avatars/2.JPG?height=200&width=200" },
    { name: "Aravind Srinivasan", role: "Editor", image: "/avatars/3.JPG?height=200&width=200" },
  ]

  const techForms = [
    {
      name: "ISRO",
      description: "Indian Space Research Organisation. India’s space agency known for cost-effective and impactful space missions.",
      image: "/images/ISRO.jpg?height=200&width=300",
    },
    {
      name: "CDAC",
      description: "Centre for Development of Advanced Computing. Developers of India’s first supercomputer, advancing research and national tech capabilities.",
      image: "/images/cdac.jpg?height=200&width=300",
    },
    {
      name: "DRDO",
      description: "Defence Research and Development Organisation. Driving innovation in defense systems, robotics, and aerospace engineering.",
      image: "/images/drdo.jpg?height=200&width=300",
    },
  ]

  const GoToTechAuthPage = () => {
    router.push("/TechClub/Auth/SignIn")
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
          <h2 className="text-2xl font-bold text-blue-600 animate-pulse">Loading Tech Club...</h2>
        </div>
      </div>

      {/* Techies Background Elements */}
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
          onClick={() => { GoToTechAuthPage() }}
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
                <Badge className="bg-blue-600 text-white px-4 py-2 text-sm">🎨 Welcome to Tech Club</Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-blue-600 animate-pulse">Build Your</span>{" "}
                  <span className="text-blue-700 animate-pulse">Imagination.</span>
                  <br />
                  <span className="text-black">Code Your Legacy.</span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ userSelect: "text" }}>
                  Join a vibrant community of young techies where creativity knows no bounds. Bring your ideas to life via code.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 hover:border-2 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  // onClick={() => {
                  //   document.getElementById("join-section")?.scrollIntoView({ behavior: "smooth" })
                  // }}
                  onClick={() => { GoToTechAuthPage() }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Join the Tech Club
                </Button>

              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 -mr-24">
                <Image
                  src="/images/tech-club.png"
                  alt="Tech Club Image"
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
              <div className="text-4xl font-bold">{techworkCount}+</div>
              <div className="text-blue-100">Tech Projects Created</div>
            </div>
            <div className="space-y-2 hover:scale-105 transition-transform duration-300 cursor-pointer p-4 rounded-lg hover:bg-blue-500/30 border-2 border-transparent hover:border-blue-300">
              <div className="text-4xl font-bold">{eventCount}+</div>
              <div className="text-blue-100">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Tech Club */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${visibleSections.has("about-section") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        id="about-section"
        data-animate
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-blue-600">About Our Tech Club</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ userSelect: "text" }}>
              Our mission is to spark innovation and curiosity by engaging students in coding, robotics, electronics, and cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card onClick={() => {goToHeritage()}} className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <Brush className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">Programming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" style={{ userSelect: "text" }}>
                  Learn the basics and beyond with hands-on coding in Python, C++, and web technologies.
                </p>
              </CardContent>
            </Card>

            <Card onClick={() => {goToGallery()}} className="bg-white border-gray-200 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30">
              <CardHeader>
                <Camera className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-black">Robotics & Hardware</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700" style={{ userSelect: "text" }}>
                  Build and program robots, circuits, and interactive tech projects from the ground up.
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
                  Collaborate with tech enthusiasts and grow through workshops, hackathons, and peer learning.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Famous Tech Inspiration */}
          <div className="bg-blue-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-black">Draw Inspiration from the Tech Icons</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Palette className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Alan Turing</h4>
                <p className="text-sm text-gray-700">Father of Modern Computing</p>
              </div>
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Brush className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Steve Jobs</h4>
                <p className="text-sm text-gray-700">Innovator in Personal Computing</p>
              </div>
              <div className="text-center hover:scale-105 transition-all duration-300 cursor-pointer p-4 rounded-lg hover:bg-white/50 border-2 border-transparent hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/50">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-semibold text-black">Tim Berners-Lee</h4>
                <p className="text-sm text-gray-700">Inventor of the World Wide Web</p>
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
              Dedicated mentors guiding your Tech journey
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
              <span className="text-blue-600">Tech Innovations & Legacy</span>
            </h2>
            <p className="text-xl text-gray-700" style={{ userSelect: "text" }}>
              Celebrating India's contributions to technology and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {techForms.map((techForm, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border-2 border-transparent hover:border-blue-400 hover:bg-blue-50/30"
              >
                <CardContent className="p-0">
                  <Image
                    src={techForm.image || "/placeholder.svg"}
                    alt={techForm.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3" style={{ userSelect: "text" }}>
                      {techForm.name}
                    </h3>
                    <p className="text-gray-700" style={{ userSelect: "text" }}>
                      {techForm.description}
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
                <CardTitle className="text-black">Monthly Tech Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Theme: "Tech for Nature" – Build or code something inspired by the natural world
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
                <CardTitle className="text-black">Innovator of the Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Be spotlighted and win exciting tech gadgets or tools
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
                <CardTitle className="text-black">Digital Innovation Expo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4" style={{ userSelect: "text" }}>
                  Annual showcase of top tech projects and digital creations
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
                Empowering students to explore their creative potential and be a part of a speical community.
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
                  Tech Gallery
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
                  <span style={{ userSelect: "text" }}>techclub@edubiz.com</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <Phone className="w-4 h-4" />
                  <span style={{ userSelect: "text" }}>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <MapPin className="w-4 h-4" />
                  <span style={{ userSelect: "text" }}>Ghaziabad, India</span>
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
                  onClick={() => window.open("https://facebook.com/Hobbizz", "_blank")}
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 border-2 border-transparent hover:border-blue-300"
                  onClick={() => window.open("https://instagram.com/Hobbizz", "_blank")}
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-300/50 border-2 border-transparent hover:border-blue-300"
                  onClick={() => window.open("https://twitter.com/Hobbizz", "_blank")}
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p style={{ userSelect: "text" }}>
              &copy; 2024 EduBiz Network. All rights reserved. | Tech Club - HOBBIZZ Platform
            </p>
          </div>
        </div>
      </footer>


    </div>
  )
}
