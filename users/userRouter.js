const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res, next) => {
  const { name } = req.body;
  db.insert({ name })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem creating the user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  res.json({ api: "/api/users/:id/posts" });
});

router.get("/", (req, res) => {
  res.json({ api: "/api/users" });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json({ api: "/api/users/:id" });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await db.getById(id);
  if (!user) return next({ code: 400, message: "invalid user id" });
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length)
    return next({ code: 400, message: "missing user data" });
  const { name } = req.body;
  if (!name) return next({ code: 400, message: "missing required name field" });
  next();
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length)
    return next({ code: 400, message: "missing post data" });
  const { text } = req.body;
  if (!text) return next({ code: 400, message: "missing required text field" });
  next();
}

module.exports = router;
