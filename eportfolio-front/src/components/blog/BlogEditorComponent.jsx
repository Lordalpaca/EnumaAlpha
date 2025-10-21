import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Navbar } from "../Navbar";
import defaultBanner from "/default-banner.jpg";

function BlogEditorComponent() {
  // For navbar
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
// For banner upload
  const handleBannerUpload = (e) => {
   let img = e.target.files[0];
  };

  return (
    <>
    {/* Header */}
      <nav
        className={cn(
          "w-full z-40 transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
            : "py-5"
        )}
      >
        <div className="flex gap-4 justify-end">
          <button className="cosmic-button">Publish</button>
          <button className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
            Save Draft
          </button>
        </div>
      </nav>

    {/* Main Section */}
      <div>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={defaultBanner}
                  className="w-full h-full object-cover z-20"
                  alt="Project Banner"
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default BlogEditorComponent;
