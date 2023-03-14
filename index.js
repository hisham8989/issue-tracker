const express = require("express");
const app = express();
const env = require("./config/environment");
const port = process.env.PORT || 3000;
const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, env.asset_path)));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine

app.use("/", require("./routes"));

db().then(() => {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
