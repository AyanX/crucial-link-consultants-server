const { getWhyPickUs, addWhyPickUs, updateWhyPickUs,deleteWhyPickUs} = require("../controller/why_pick_us/whyPickUs");

const express = require("express");
const whyPickUsRouter = express.Router();

// get why pick us content
whyPickUsRouter.get("/", getWhyPickUs);

// add why pick us content
whyPickUsRouter.post("/", addWhyPickUs);

// update why pick us content
whyPickUsRouter.patch("/:id", updateWhyPickUs);

// delete why pick us content
whyPickUsRouter.delete("/:id", deleteWhyPickUs);

module.exports = whyPickUsRouter;