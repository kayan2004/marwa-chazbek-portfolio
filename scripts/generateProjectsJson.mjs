import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import pkg from "image-size";
const imageSize = pkg.default || pkg;

// Import sharp and blurhash
import sharp from "sharp";
import { encode } from "blurhash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, "../public/assets/projects");
const projectsJsonPath = path.join(__dirname, "../src/projects.json"); // Define path for output

function naturalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

// Function to encode an image to blurhash
async function encodeImageToBlurhash(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Resize the image to a smaller resolution for faster Blurhash encoding.
    // 32x32 is a common base, but keeping aspect ratio is important.
    // Using 4x3 components for Blurhash provides a good balance of quality and size.
    const resizeWidth = 128; // Max width for internal processing
    const resizeHeight = 128; // Max height for internal processing

    const { data, info } = await image
      .raw()
      .ensureAlpha() // Ensure image has an alpha channel for raw pixel data
      .resize(resizeWidth, resizeHeight, { fit: "inside" }) // Resize for faster encoding
      .toBuffer({ resolveWithObject: true });

    // Ensure the buffer has enough data; handle potential errors from sharp
    if (!data || data.length === 0) {
      console.warn(`Sharp returned empty buffer for ${imagePath}`);
      return null;
    }

    // Adjust componentsX and componentsY for desired Blurhash quality (3-5 is common).
    // Using 4x3 as recommended by Blurhash creators for common cases.
    const componentsX = 4;
    const componentsY = 3;

    const blurhash = encode(
      data,
      info.width,
      info.height,
      componentsX,
      componentsY
    );
    return blurhash;
  } catch (error) {
    console.error(`Error encoding blurhash for ${imagePath}:`, error);
    return null; // Return null on error
  }
}

async function readDirRecursive(dirPath) {
  // Make this async
  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .sort(naturalSort);

  const results = [];
  for (const entry of entries) {
    // Use for...of for async/await in loops
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push({
        name: entry.name,
        type: "directory",
        children: await readDirRecursive(fullPath), // Await recursive calls
      });
    } else {
      const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp)$/i;
      let width, height, blurhash; // Add blurhash variable
      if (imageExtensions.test(entry.name)) {
        try {
          const buffer = fs.readFileSync(fullPath);
          const dimensions = imageSize(buffer);
          width = dimensions.width;
          height = dimensions.height;

          // Generate Blurhash here
          blurhash = await encodeImageToBlurhash(fullPath); // Await blurhash generation
        } catch (err) {
          console.error(
            `Error processing image ${fullPath} (size or blurhash):`,
            err
          );
          width = null;
          height = null;
          blurhash = null;
        }
      }

      results.push({
        name: entry.name,
        type: "file",
        ...(width && height ? { width, height } : {}),
        ...(blurhash ? { blurhash } : {}), // Add blurhash if generated
      });
    }
  }
  return results;
}

// Make the main execution an async IIFE
(async () => {
  try {
    console.log(
      "Generating projects.json with image dimensions and blurhashes..."
    );
    const result = await readDirRecursive(projectsDir); // Await the main recursive call

    // Write the JSON file to the src folder
    fs.writeFileSync(projectsJsonPath, JSON.stringify(result, null, 2));

    console.log(`projects.json generated successfully at ${projectsJsonPath}`);
  } catch (error) {
    console.error("Failed to generate projects.json:", error);
  }
})();
