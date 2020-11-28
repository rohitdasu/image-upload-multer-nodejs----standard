const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is secure route");
});

module.exports = router;