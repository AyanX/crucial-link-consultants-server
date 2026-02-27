const { getWhyPickUs, addWhyPickUs, updateWhyPickUs,deleteWhyPickUs} = require("../controller/why_pick_us/whyPickUs");

const express = require("express");
const useAuth = require("../utils/middlewares/useAuth");
const whyPickUsRouter = express.Router();

// get why pick us content
whyPickUsRouter.get("/", getWhyPickUs);

// add why pick us content
whyPickUsRouter.post("/", useAuth, addWhyPickUs);

// update why pick us content
whyPickUsRouter.patch("/:id", useAuth, updateWhyPickUs);

// delete why pick us content
whyPickUsRouter.delete("/:id", useAuth, deleteWhyPickUs);

module.exports = whyPickUsRouter;