import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert the URL object to a file path for __dirname equivalent
// const __dirname = fileURLToPath(new URL(".", import.meta.url));
const __dirname = process.cwd();

// Path to the package.json file
const packageJsonPath = path.resolve(__dirname, "package.json");

// Load the content of package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Get a list of all subdirectories in the 'dist' directory
const distDir = path.resolve(__dirname, "dist");
const subdirectories = fs
  .readdirSync(distDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

// Prepare the exports object
const exports = {
  ".": "./dist/index.js", // Export for index.js in the root directory
};

// Add exports for index.js files from subdirectories
subdirectories.forEach((subDir) => {
  exports[`./${subDir}`] = `./dist/${subDir}/index.js`;
});

// Add the modified exports to package.json
packageJson.exports = { ...exports };

// Write the modified package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
