const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

//TODO: Generate Token
function generateToken(id, role) {
  const payload = {
    id: id + "",
    role: role + "",
    create: moment().unix(),
    exp: moment().add(1, "minute").unix(),
  };
  return jwt.sign(payload, process.env.JWT_KEY);
}

//TODO: Check Token
//TODO: Update Token
module.exports = { generateToken };
