require('dotenv').config()
const env = {
    name:"development",
    asset_path:"/assets",
    db: 'issue_tracker',
    db_host:'hisham',
    db_pass:process.env.DB_PASSWORD
}

module.exports = env