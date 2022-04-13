require('dotenv').config()
const development = {
    name:"development",
    asset_path:"/assets",
    db: 'issue_tracker_development',
    cluster_host:'hisham',
    cluster_pass:process.env.CLUSTER_PASSWORD_PASSWORD
}

const production = {
    name:"production",
    asset_path:"/assets",
    db: 'issue_tracker_production',
    cluster_host:'hisham',
    cluster_pass:process.env.CLUSTER_PASSWORD_PASSWORD
}


module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);