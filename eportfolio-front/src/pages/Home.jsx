import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {StarBackground} from "@/components/StarBackground"
import { ThemeToggle } from "../components/ThemeToggle"
import { Navbar } from "../components/Navbar"
import { HeroSection } from "../components/HeroSection"
import AboutSection from "../components/AboutSection"
import { ProjectsSection } from "../components/ProjectsSection"
import { Footer } from "../components/Footer"

function Home() {
  const { hash } = useLocation()

  // React Router doesn't scroll to hash targets, so arriving from another
  // page (or clicking the same nav link twice) needs handling here.
  useEffect(() => {
    if (!hash) return
    const target = document.querySelector(hash)
    if (!target) return
    const id = setTimeout(
      () => target.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    )
    return () => clearTimeout(id)
  }, [hash])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      {/*  Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
export default Home