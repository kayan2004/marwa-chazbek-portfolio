import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, "../src/assets/projects");

function readDirRecursive(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
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

fs.writeFileSync(
  path.join(projectsDir, "projects.json"),
  JSON.stringify(result, null, 2)
);

console.log("projects.json generated!");