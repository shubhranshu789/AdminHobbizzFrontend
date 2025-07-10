"use client"

import React from 'react'
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();


  const GoToArtAuthPage = () => {
    router.push("/Components/Auth/SignIn")
  }

  return (
    <div>
      <nav
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 2rem" }}
        className={`relative z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 shadow-lg transition-all duration-1000`}
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
    </div>
  )
}

export default page