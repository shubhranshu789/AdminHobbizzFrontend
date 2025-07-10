"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation';


// import "../../../Components/Auth/DistrictSignIn"

const navigationItems = [
  { name: "Director",  id : "Director"},
  { name: "Teacher", id : "Teacher" },
  { name: "Principle", id : "Principle"},
  { name: "Editor",  id : "Editor"},
  // { name: "Judge",  id : "Judge"},
  // { name: "Team", href: "#team" },
  // { name: "Blog", href: "#blog" },
  // { name: "Contact", href: "#contact" },
  // { name: "Support", href: "#support" },
  // { name: "Careers", href: "#careers" },
]






export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)


    const router = useRouter();
  
    const GoToCabinateSignIn = () => {
      router.push('/Components/Auth/SignIn');
    };
    const GoToPrincipleSignIn = () => {
      router.push('/Components/Auth/PrincipleSignIn');
    };

    const GoToEditorSignIn = () => {
      router.push('/Components/Auth/EditorSignIn');
    };
    const GoToJudgeSignIn = () => {
      router.push('/Components/Auth/JudgeSignIn');
    };
    const GoToDirectorSignIn = () => {
      router.push('/Components/Auth/DistrictSignIn');
    };




  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img style={{height : "40px"}} src="/LOGO.png" alt="" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => {
                  if(item.id == "Teacher"){
                    GoToCabinateSignIn()
                  }
                  if(item.id == "Director"){
                    GoToDirectorSignIn()
                  }
                  if(item.id == "Principle"){
                    GoToPrincipleSignIn()
                  }
                  if(item.id == "Editor"){
                    GoToEditorSignIn()
                  }
                  if(item.id == "Judge"){
                    GoToJudgeSignIn()
                  }
                }}
              >
                <p>{item.name}</p>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      asChild
                      className="justify-start text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <p>{item.name}</p>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
