const express = require("express");
const authorController = require("../controller/AuthorController");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if (!req.query.search) {
    authorController.getAll(req, res);
  } else {
    authorController.search(req, res);
  }
});

router.get("/:id", (req, res) => {
  authorController.getOne(req, res);
});

module.exports = router;
