const express = require("express");
const bookController = require("../controller/BookController");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if (!req.query.search) {
    bookController.getAll(req, res);
  } else {
    bookController.search(req, res);
  }
});

router.get("/books/:id", (req, res) => {
  bookController.getOne(req, res);
});

module.exports = router;
