import React from "react";
import { useParams } from "react-router-dom";
import projectsData from "../../src/projects.json";
import ProjectDetails from "../components/ProjectDetails";

// Map second-level dir names to paragraphs
const projectParagraphs = {
  lock: "This is the paragraph for the lock project.",
  "moon clock": "This is the paragraph for the moon clock project.",
  // Add more as needed
};

function collectFiles(node, parentPath = "") {
  let files = [];
  const currentPath = parentPath ? parentPath + "/" + node.name : node.name;
  if (node.type === "file") {
    files.push(currentPath);
  } else if (node.type === "directory" && node.children) {
    node.children.forEach((child) => {
      files = files.concat(collectFiles(child, currentPath));
    });
  }
  return files;
}

const Projects = () => {
  const { category } = useParams();
  console.log("Route param category:", category);

  // Find the category node (first-level directory)
  const categoryNode = projectsData.find(
    (item) => item.name && item.name.toLowerCase() === category.toLowerCase()
  );
  console.log("Matched categoryNode:", categoryNode);

  if (!categoryNode) {
    return <p>No projects found for this category.</p>;
  }

  // Get all second-level directories (projects)
  const secondLevelDirs = categoryNode.children
    ? categoryNode.children.filter((child) => child.type === "directory")
    : [];
  console.log("Second-level directories:", secondLevelDirs);

  // Get files directly under the category node
  const directFiles = categoryNode.children
    ? categoryNode.children.filter((child) => child.type === "file")
    : [];
  console.log("Direct files in category:", directFiles);

  return (
    <div>
      <h2 className="text-2xl mb-4 capitalize">{category} Projects</h2>

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
              console.log("Rendering direct filePath:", filePath);
              return (
                <div key={filePath}>
                  {filePath.match(/\.(jpg|jpeg|png|gif|png)$/i) ? (
                    <img
                      loading="lazy"
                      src={`/assets/projects${filePath}`}
                      alt={file.name}
                      className="w-full rounded shadow"
                    />
                  ) : filePath.match(/\.(mp4)$/i) ? (
                    <video
                      controls
                      loop
                      src={`/assets/projects${filePath}`}
                      alt={file.name}
                      className="w-full rounded shadow"
                    />
                  ) : (
                    <span>{file.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Render subdirectories as projects */}
      {secondLevelDirs.length > 0
        ? secondLevelDirs.map((dir) => {
            const files = collectFiles(dir, "/" + category);
            console.log(`Project: ${dir.name}, Files:`, files);

            return (
              <div key={dir.name} className="mb-8">
                <ProjectDetails
                  title={dir.name}
                  description={projectParagraphs[dir.name] || ""}
                />
                <div className="grid auto-rows-auto md:grid-cols-2 gap-4 mt-2">
                  {files.map((filePath) => {
                    console.log("Rendering filePath:", filePath);
                    return (
                      <div key={filePath}>
                        {filePath.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <img
                            loading="lazy"
                            src={`/assets/projects${filePath}`}
                            alt={filePath.split("/").pop()}
                            className="w-full rounded shadow"
                          />
                        ) : filePath.match(/\.(mp4)$/i) ? (
                          <video
                            controls
                            loop
                            src={`/assets/projects${filePath}`}
                            alt={filePath.split("/").pop()}
                            className="w-full rounded shadow"
                          />
                        ) : (
                          <span>{filePath.split("/").pop()}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        : directFiles.length === 0 && (
            <p>No projects found for this category.</p>
          )}
    </div>
  );
};

export default Projects;
