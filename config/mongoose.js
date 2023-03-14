const mongoose = require("mongoose");
const env = require("./environment");

let uri = `mongodb+srv://${env.cluster_host}:${env.cluster_pass}@cluster0.${env.key}.mongodb.net/?retryWrites=true&w=majority`;

const db = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = db;
