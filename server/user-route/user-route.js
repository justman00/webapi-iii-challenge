const express = require("express");
const db = require("../../data/helpers/userDb");

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
  console.log(name, id);
  try {
    const updatedUser = await db.update(id, { name });
    res.status(200).json({ updatedUser });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Oops, a problem occured" });
  }
});

module.exports = router;
