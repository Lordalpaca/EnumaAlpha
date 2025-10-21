import BlogEditorComponent from "../components/blog/BlogEditorComponent"
import { Navbar } from "../components/Navbar"
import { ThemeToggle } from "../components/ThemeToggle"
import {StarBackground} from "@/components/StarBackground"

function EditorPage() {
  return (
    <>
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      {/* Main Content */}
      <main>
        <BlogEditorComponent />
      </main>
    </>
  )
}
export default EditorPage