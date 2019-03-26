const express = require("express");
const db = require("../../data/helpers/postDb");

const router = express.Router();

function checkForDetails(req, res, next) {
  const { text, user_id } = req.body;
  if (!text || text.length === 0 || !user_id) {
    res.status(400).json({ message: "provide a text or a user id" });
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

router.post("/", checkForDetails, async (req, res) => {
  const { text, user_id } = req.body;
  try {
    const newPost = await db.insert({ text, user_id });
    res.status(200).json({ newPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

router.put("/:id", checkForDetails, async (req, res) => {
  const { text, user_id } = req.body;
  const { id } = req.params;

  try {
    const updatedPost = await db.update(id, { text, user_id });
    res.status(200).json({ updatedPost });
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
