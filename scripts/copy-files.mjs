import fs from "fs";
import path from "path";

// Current working directory
const currentWorkingDir = process.cwd();

// List of files to copy
const filesToCopy = ["package.json", "README.md"];

// Target directory
const targetDir = path.join(currentWorkingDir, "dist");

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Function for copying a file
const copyFile = (fileName) => {
  const sourcePath = path.join(currentWorkingDir, fileName);
  const targetPath = path.join(targetDir, fileName);

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`${fileName} has been successfully copied to ${targetDir}`);
};

// Copying each file
filesToCopy.forEach(copyFile);
