import path from "path";

export function categorizeFileType(filePath) {
  // Extract the extension name and convert it to lowercase
  const ext = path.extname(filePath).toLowerCase();
  console.log("ext: ", ext);
  // Define the categories
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];
  const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"];
  const rawExtensions = [".zip", ".rar", ".tar", ".gz", ".7z"];

  // Determine the category based on the extension
  if (imageExtensions.includes(ext)) {
    return "image";
  } else if (videoExtensions.includes(ext)) {
    return "video";
  } else return "raw";
}
