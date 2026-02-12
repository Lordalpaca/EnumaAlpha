import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import EditorPage from "./pages/EditorPage"
import ProjectPage from "./pages/ProjectPage"

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route index element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/alphasecretpage" element={<EditorPage />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
