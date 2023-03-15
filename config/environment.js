require("dotenv").config();
const development = {
  name: "development",
  asset_path: "/assets",
  db: process.env.DB_NAME,
  cluster_host: process.env.CLUSTER_HOSTNAME,
  key: process.env.CLUSTER_KEY,
  cluster_pass: process.env.CLUSTER_PASSWORD,
};

const production = {
  name: "production",
  asset_path: "/assets",
  db: process.env.DB_NAME,
  cluster_host: process.env.CLUSTER_HOSTNAME,
  key: process.env.CLUSTER_KEY,
  cluster_pass: process.env.CLUSTER_PASSWORD,
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
