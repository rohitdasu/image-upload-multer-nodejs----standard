const express = require("express");
const router = express.Router();
const multer = require("multer");

const port = process.env.PORT || 3000;

/**
 * Multer Configuration
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb stands for callback
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      let filetype = "";
      if (file.mimetype === "image/png") {
          filetype = "png";
        }
      if (file.mimetype === "image/jpeg") {
          filetype = "jpg";
        }
      cb(null, "image-" + Date.now() + "." + filetype);
    },
  });

  let upload = multer({ storage: storage });

  /******************************************************************************* */

  router.get("/", (req, res) => {
    res.send("this is media route");
  });

  
  /**Post Image **/
  router.post("/upload", upload.single("file"), function (req, res, next) {

    if (!req.file) {
      res.status(400).json({
          status:'failure',
          message:'empty file'
      });
      return;
    }

    let hostedin = req.protocol + "://" + req.hostname + ":" + port;
    let actualfilepath = hostedin+ `/public/images/` + req.file.filename; // store this path to database and give to UI

    res.json({file:actualfilepath});
  });

  

 
module.exports = router;