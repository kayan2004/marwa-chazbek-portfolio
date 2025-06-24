import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, "../public/assets/projects");

function naturalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function readDirRecursive(dirPath) {
  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .sort(naturalSort);
  return entries.map((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return {
        name: entry.name,
        type: "directory",
        children: readDirRecursive(fullPath),
      };
    } else {
      return {
        name: entry.name,
        type: "file",
      };
    }
  });
}

const result = readDirRecursive(projectsDir);

// Write the JSON file to the src folder
fs.writeFileSync(
  path.join(__dirname, "../src/projects.json"),
  JSON.stringify(result, null, 2)
);

console.log("projects.json generated in src/");
