const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../public/uploads/docs");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Allowed MIME types for documents
const allowedTypes = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/rtf",
  "text/plain",
];

// File filter (documents only)
const fileFilter = (_req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, RTF, TXT files are allowed"), false);
  }
};

const multerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter,
}).single("document"); // must match frontend key

// Custom wrapper middleware
const uploadDocs = (req, res, next) => {
  multerUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message || "File upload failed",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Document is required",
      });
    }

    const baseUrl = process.env.APP_URL.replace(/\/$/, "");

    req.fileUrl = `${baseUrl}/uploads/docs/${req.file.filename}`;

    next();
  });
};

module.exports = uploadDocs;