import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { useNavigate, useParams } from "react-router-dom";
import projectsData from "../../src/projects.json";
import ProjectDetails from "../components/ProjectDetails";

// Map second-level dir names to paragraphs
const projectParagraphs = {
  "bfa project":
    "من كسر القمر؟ is an original children's book based on a true childhood story from my family. The book follows the imagination of a young girl who, upon seeing the crescent moon for the first time, wonders who might have broken it.",
  beatbox:
    "BeatBox is a vibrant music streaming platform that celebrates exploration, linking listeners with a wide range of sounds. The brand identity embodies the app’s lively and fun character through striking visuals, rhythmic graphics. It highlights BeatBox’s goal of making music  discovery easy, welcoming, and packed with personality.",
  "chouf trails":
    "Chouf Trails is a branding project for a local hiking guide company operating in the Shouf Biosphere Reserve in Lebanon. The mission is to offer personalized, high-quality hiking and mountain climbing experiences that are affordable and inclusive.",
  "logo design":
    "Designed logos for two distinct brands: DeBug, a cybersecurity company, and Catmatt, a retail brand specializing in stylish and functional cat furniture.",
  "Beiteddine brochure":
    "A touristic brochure designed to promote Beiteddine, a historical town located in the Chouf region of Lebanon.",
  "bilingual magazine":
    "A magazine spread designed in both Arabic and English, following the typographic style and design principles of Matthew Carter.",
  "riot games anual report":
    "An annual report designed for Riot Games, presenting the company’s key statistics, financial data, and performance percentages in a clear and visually engaging format.",
  "comic strip":
    "For this comic strip project, I explored the Lebanese proverb ”صمت صمت وفطرت عبصلة” — which roughly translates to “waited and waited, only to break the fast on an onion”. The saying is used to express disappointment after long anticipation. The comic interprets this proverb visually, playing on its double meaning through storytelling and character design.",
  "self portrait":
    "A set of two self-portraits capturing myself as a child and as an adult, both illustrated in the same pose.",
  packaging:
    "A refreshed packaging design for من الضيعة اللبنانية, a local Lebanese food brand, the work included the design of a cohesive 3-pack set.",
  "sports photography":
    "As part of my student work position at the University of Balamand, I photographed all athletic teams representing the university in the FSUL league.",
  "still photography":
    "Studio-based still photography focused on capturing food, beverages, and various products.",
  "street photography":
    "A documentary-style street photography series capturing everyday life, culture, and the vibrant atmosphere of Jbeil.",
  animation:
    "Created a 3D animation of a bouncing ball using Autodesk Maya, then creatively transformed the animation concept into a 2D animated rat character using Adobe Photoshop.",
  lock: "",
  "moon clock":
    "Created a detailed 3D model of a clock hanging from a crescent moon using Autodesk Maya.",
  "room interior":
    "The project focused on realistic spatial arrangement and furniture modeling.",
  // Add more as needed
};

// Recursively collect all file paths and their metadata from a directory node
function collectFilesWithMeta(node, parentPath = "") {
  let files = [];
  const currentPath = parentPath ? parentPath + "/" + node.name : node.name;
  if (node.type === "file") {
    files.push({
      path: currentPath,
      width: node.width,
      height: node.height,
      name: node.name,
      blurhash: node.blurhash,
    });
  } else if (node.type === "directory" && node.children) {
    node.children.forEach((child) => {
      files = files.concat(collectFilesWithMeta(child, currentPath));
    });
  }
  return files;
}

const Projects = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the category node (first-level directory)
  const categoryNode = projectsData.find(
    (item) => item.name && item.name.toLowerCase() === category.toLowerCase()
  );

  if (!categoryNode) {
    return <p>No projects found for this category.</p>;
  }

  // Get all second-level directories (projects)
  const secondLevelDirs = categoryNode.children
    ? categoryNode.children.filter((child) => child.type === "directory")
    : [];

  // Get files directly under the category node
  const directFiles = categoryNode.children
    ? categoryNode.children.filter((child) => child.type === "file")
    : [];

  // Helper to render an image/video/file with Blurhash
  const MediaWithBlurhash = ({
    filePath,
    altName,
    width,
    height,
    blurhash,
  }) => {
    const [loaded, setLoaded] = useState(false);

    if (filePath.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return (
        <div className="relative w-full ">
          {!loaded && blurhash && (
            <Blurhash
              hash={blurhash}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              className="absolute inset-0 w-full h-full rounded"
            />
          )}
          <img
            loading="lazy"
            src={`/assets/projects${filePath}`}
            alt={altName}
            width={width}
            height={height}
            style={{
              aspectRatio: width && height ? `${width} / ${height}` : undefined,
            }}
            className={`w-full object-cover rounded shadow cursor-pointer transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => {
              if (e.target.requestFullscreen) e.target.requestFullscreen();
            }}
            onLoad={() => setLoaded(true)}
          />
        </div>
      );
    } else if (filePath.match(/\.(mp4)$/i)) {
      return (
        <video
          controls
          loop
          src={`/assets/projects${filePath}`}
          alt={altName}
          className="w-full rounded shadow"
        />
      );
    } else {
      return <span>{altName}</span>;
    }
  };

  return (
    <div className="relative">
      <button
        className="fixed top-[6.5%] left-[2%] lg:left-[13%] cursor-pointer"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg
          className="w-4 md:w-8 aspect-auto fill-current text-secondary hover:text-primary text-left mb-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      <div>
        <h2 className="text-3xl mb-4 uppercase">{category} </h2>
        {/* Render direct files if any */}
        {directFiles.length > 0 && (
          <div className="mb-8">
            <ProjectDetails
              title={categoryNode.name}
              description={projectParagraphs[categoryNode.name] || ""}
            />
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              {directFiles.map((file) => {
                const filePath = "/" + category + "/" + file.name;
                return (
                  <div
                    className={`aspect-[var(--aspect-ratio)] rounded-lg`}
                    style={{
                      "--aspect-ratio": `${file.width} / ${file.height}`,
                    }}
                    key={filePath}
                  >
                    <MediaWithBlurhash
                      filePath={filePath}
                      altName={file.name}
                      width={file.width}
                      height={file.height}
                      blurhash={file.blurhash}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Render subdirectories as projects */}
        {secondLevelDirs.length > 0
          ? secondLevelDirs.map((dir) => {
              const files = collectFilesWithMeta(dir, "/" + category);
              return (
                <div key={dir.name} className="mb-8">
                  <ProjectDetails
                    title={dir.name}
                    description={projectParagraphs[dir.name] || ""}
                  />
                  <div className="grid auto-rows-auto md:grid-cols-2 gap-4 mt-2">
                    {files.map((file) => (
                      <div
                        className={`aspect-[var(--aspect-ratio)] rounded-lg`}
                        style={{
                          "--aspect-ratio": `${file.width} / ${file.height}`,
                        }}
                        key={file.path}
                      >
                        <MediaWithBlurhash
                          filePath={file.path}
                          altName={file.name}
                          width={file.width}
                          height={file.height}
                          blurhash={file.blurhash}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          : directFiles.length === 0 && (
              <p>No projects found for this category.</p>
            )}
      </div>
    </div>
  );
};

export default Projects;
