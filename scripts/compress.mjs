// const { execSync } = require("child_process");
// const fs = require("fs");
// const path = require("path");
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function findBinary(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // ignore
    } else if (file === "dev-tool" || file.includes("dev-tools.exe")) {
      return filePath;
    }
  }
  return null;
}

const targetDir = path.join(".", "src-tauri", "target", "release");
const binaryPath = findBinary(targetDir);

if (binaryPath) {
  console.log(`Found binary: ${binaryPath}`);
  try {
    execSync(`upx --best --lzma "${binaryPath}"`);
    console.log("UPX compression completed successfully.");
  } catch (error) {
    console.error("Error during UPX compression:", error);
    process.exit(1);
  }
} else {
  console.error("Binary not found");
  process.exit(1);
}
