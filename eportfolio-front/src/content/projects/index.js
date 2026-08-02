// Import all projects here
import theSparklingHour2126 from "./the-sparkling-hour-2126.js";
import contentAutomation from "./content-automation.js";
import sukonthnai from "./sukonthnai.js";
import leafywear from "./leafywear.js";
import optogeneticPaceMachine from "./optogenetic-pace-machine.js";
import spaceCowApocalypse from "./space-cow-apocalypse.js";

// Add new projects to this array
// They will automatically appear on the home page and get their own detail page
export const projects = [
  theSparklingHour2126,
  contentAutomation,
  sukonthnai,
  leafywear,
  optogeneticPaceMachine,
  spaceCowApocalypse,
];

// Helper to find a project by slug
export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};

// Get all project slugs (useful for generating routes)
export const getAllSlugs = () => {
  return projects.map((project) => project.slug);
};
