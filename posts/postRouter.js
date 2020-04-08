const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ api: "running..." });
});

router.get("/:id", (req, res, next) => {
  res.json({ api: "running..." });
});

router.delete("/:id", (req, res, next) => {
  res.json({ api: "running..." });
});

router.put("/:id", (req, res, next) => {
  res.json({ api: "running..." });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
