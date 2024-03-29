const mongoose = require("mongoose");
const env = require("./environment");

let uri = `mongodb+srv://${env.cluster_host}:${env.cluster_pass}@cluster0.${env.key}.mongodb.net/${env.db}?retryWrites=true&w=majority`;

main().catch((err) => console.log("Error in connecting Database:\n", err));

async function main() {
  await mongoose.connect(uri);
}
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to MongoDb ::", env.db);
});
module.exports = db;
