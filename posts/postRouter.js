const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res, next) => {
  Posts.get()
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem retrieving the posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.json(req.post);
});

router.delete("/:id", validatePostId, (req, res, next) => {
  res.json({ api: "running..." });
});

router.put("/:id", validatePostId, (req, res, next) => {
  res.json({ api: "running..." });
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const post = await Posts.getById(id);
  if (!post) return next({ code: 400, message: "invalid post id" });
  req.post = post;
  next();
}

module.exports = router;
