const express = require("express");
const db = require("../../data/helpers/userDb");
const dbPost = require("../../data/helpers/postDb");

const router = express.Router();

function checkForName(req, res, next) {
  const { name } = req.body;
  if (!name || name.length === 0) {
    res.status(400).json({ message: "provide a name" });
  } else {
    next();
  }
}

router.get("/", async (req, res) => {
  try {
    const data = await db.get();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userDetails = await db.getById(req.params.id);
    const allPosts = await db.getUserPosts(req.params.id);

    res.status(200).json({ ...userDetails, posts: allPosts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

router.post("/", checkForName, async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = await db.insert({ name });
    res.status(200).json({ newUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

router.put("/:id", checkForName, async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await db.update(id, { name });
    res.status(200).json({ updatedUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.remove(req.params.id);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

module.exports = router;
