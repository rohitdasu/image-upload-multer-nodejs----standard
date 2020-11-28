const mongoose = require("mongoose");
const config = require("config");

const dbName = config.get("app.dbConfig.dbName");
const username = config.get("app.dbConfig.username");
const password = config.get("app.dbConfig.password");

mongoose
  .connect(
    "mongodb+srv://" +
      username +
      ":" +
      encodeURIComponent(password) +
      "@cluster0-fdams.mongodb.net/" +
      dbName +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology:true }
  )
  .then((res) => {
    console.log("DB Connected Successfully! ");
  })
  .catch((err) => {
    console.log("Error : " + err);
  });
