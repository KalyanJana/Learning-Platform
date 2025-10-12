import multer from "multer";

const ALLOWED_MIME = [
  "application/pdf",
  "video/mp4",
  "video/quicktime",
  "video/x-matroska",
  "image/jpeg",
  "image/JPG",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 18 * 1024 * 1024 }, // 18MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDFs, mp4/mkv/mov videos, and images allowed!"));
  },
});
