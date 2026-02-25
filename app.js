const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);


app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const userRouter = require("./router/users.router");
const whyPickUsRouter = require("./router/whyPickUs.router");
const contactsRouter = require("./router/contacts.router");
const websiteInfoRouter = require("./router/website.info.router");
const socialsRouter = require("./router/socials.router");
const messagesRouter = require("./router/messages.router");
const callingTimeRouter = require("./router/callingtime.router");
const securityRouter = require("./router/security.router");

app.use("/api/settings/security", securityRouter);

app.use("/api/why-pick-us", whyPickUsRouter);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use("/api/users", userRouter);

app.use("/api/contacts", contactsRouter);

app.use("/api/socials", socialsRouter);

app.use("/api/website-info", websiteInfoRouter);

app.use("/api/messages", messagesRouter);

app.use("/api/calling-times", callingTimeRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
