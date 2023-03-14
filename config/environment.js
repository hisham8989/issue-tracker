require("dotenv").config();
const development = {
  name: "development",
  asset_path: "/assets",
  db: "test",
  cluster_host: "hishamprofessionals",
  key: "bir6o9z",
  cluster_pass: process.env.CLUSTER_PASSWORD,
};

const production = {
  name: "production",
  asset_path: "/assets",
  db: "test",
  cluster_host: "hishamprofessionals",
  key: "bir6o9z",
  cluster_pass: process.env.CLUSTER_PASSWORD,
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
