"use client"

import { ArrowRight, Palette, Music, Bot, PenTool, Heart, Star, Users, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation';


// import "../Components/Auth/SignUp"

export default function HomePage() {
    const router = useRouter();

    const AuthPageArt = () => {
        router.push('/Components/Auth/SignUp');
    };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#357af3] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#357af3]">HOBBIZZ</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {/* <a href="#clubs" className="text-gray-600 hover:text-[#357af3] transition-colors">
              Clubs
            </a>
            <a href="#about" className="text-gray-600 hover:text-[#357af3] transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#357af3] transition-colors">
              Reviews
            </a> */}
            {/* <Button onClick={() => {AuthPage()}} className="bg-[#357af3] hover:bg-[#2968d9] text-white">Get Started</Button> */}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center bg-[#357af3]/10 text-[#357af3] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Unlock the Power of Free Time
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Free time isn't just downtime — <span className="text-[#357af3]">it's opportunity time</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            At HOBBIZZ, we help children channel their curiosity and energy into something extraordinary. With the right
            guidance, a simple interest can evolve into a lifelong passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#357af3] hover:bg-[#2968d9] text-white px-8 py-4 text-lg">
              Explore Clubs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#357af3] text-[#357af3] hover:bg-[#357af3] hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🚀 Explore. Experience. Excel.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every child is different — and so are their dreams. That's why we offer a wide range of clubs that spark
              joy and discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="clubs">
            <Card onClick={() => {AuthPageArt()}} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🎨 Art & Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nurture imagination through painting, sketching, and digital design
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💃 Dance & Music</h3>
                <p className="text-gray-600 leading-relaxed">Let rhythm and melody build confidence and expression</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#357af3] to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 Tech & Robotics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Inspire the next generation of creators and problem-solvers
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">✍️ Creative Writing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cultivate powerful voices and bold ideas through writing and public speaking
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🧘 Wellness & Mindfulness</h3>
                <p className="text-gray-600 leading-relaxed">Build inner strength, focus, and balance</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#357af3]/20 md:col-span-2 lg:col-span-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#357af3] to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">✨ And More!</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether it's a hobby or a hidden talent — at HOBBIZZ, every interest has a home
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why HOBBIZZ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#357af3]/5 to-indigo-50" id="about">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💡 Why HOBBIZZ?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#357af3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Skill-building, not screen-scrolling</h3>
              <p className="text-gray-600 text-sm">Real activities that develop genuine skills and talents</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#357af3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Safe, guided clubs</h3>
              <p className="text-gray-600 text-sm">Led by experienced mentors and passionate enthusiasts</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#357af3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Creativity & confidence</h3>
              <p className="text-gray-600 text-sm">Encourages creativity, confidence, and collaboration</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#357af3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vibrant community</h3>
              <p className="text-gray-600 text-sm">A community that celebrates every child's uniqueness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-white" id="testimonials">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 Fuel Dreams with Passion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              What starts as a fun activity can become a future — a career, a cause, or a calling. At HOBBIZZ, we don't
              just fill time. We shape futures.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-[#357af3]/20 bg-gradient-to-br from-[#357af3]/5 to-indigo-50">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "My child discovered a love for robotics at HOBBIZZ — now he's building his own projects!"
                </blockquote>
                <cite className="text-[#357af3] font-semibold">– A happy parent</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#357af3] to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">🎉 Get Started Today</h2>
          <p className="text-xl mb-8 opacity-90">Don't let free time go to waste. Let it become something amazing.</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold mb-2">Sign up in minutes</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold mb-2">Browse exciting clubs</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold mb-2">Track growth & milestones</h3>
            </div>
          </div>

          <Button size="lg" className="bg-white text-[#357af3] hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
            Join the HOBBIZZ Community
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="mt-6 text-lg opacity-90">Join the HOBBIZZ community — where passion fuels big dreams.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#357af3] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">HOBBIZZ</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HOBBIZZ. All rights reserved. Shaping futures, one hobby at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
