/**
 * express framework import
 */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

/**
 * routes import
 */
const authRoutes = require("./routes/auth/auth");
const secureRoutes = require("./routes/secure/secure");
const mediaRoutes = require("./routes/media/media");
const db = require("./db/db");

/**
 * port number is initialised
 */
const port = 3000 || process.env.PORT;

/**
 * using bodyparser middleware to have json type values in this app
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname)); // it can be used for accessing files

/**
 * setting routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/secure", secureRoutes);
app.use("/api/media", mediaRoutes);

/**
 * root api
 */

app.get("/", (req, res) => {
  res.send("this is root api");
});

/**
 * server starting at the port number
 */
app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
