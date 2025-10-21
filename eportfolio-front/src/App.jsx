import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import { Heading1 } from "lucide-react"
import EditorPage from "./pages/EditorPage"

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route index element={<Home />} />
      <Route path="/alphasecretpage" element={<EditorPage />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
