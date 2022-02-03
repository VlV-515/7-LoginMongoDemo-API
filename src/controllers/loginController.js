const jwt = require("jsonwebtoken");
const moment = require("moment");
require("dotenv").config();

//TODO: Generate Token
function generateToken(id, role) {
  const payload = {
    id: id + "",
    role: role + "",
    create: moment().unix(),
    exp: moment().add(60, "minute").unix(),
  };
  return jwt.sign(payload, process.env.JWT_KEY);
}

//TODO: Check Token
function checkToken(token, role) {
  try {
    const jwtDecode = jwt.verify(token, process.env.JWT_KEY);
    return role == jwtDecode.role;
  } catch (error) {
    return false;
  }
}
//TODO: Update Token
module.exports = { generateToken, checkToken };
