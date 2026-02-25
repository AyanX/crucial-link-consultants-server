const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter (only images)
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const multerUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
}).single("image");

// Custom wrapper middleware
const upload = (req, res, next) => {
  multerUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message || "File upload failed",
      });
    }

    if (!req.file) {
      return next(); // No file uploaded, continue to next middleware
    }

    // Remove trailing slash if exists
    const baseUrl = process.env.APP_URL.replace(/\/$/, "");

    // Attach full public URL to request
    req.fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    next();
  });
};

module.exports = upload;