const moment = require("moment");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(role, username) {
  const expTimeJWT = moment().add(5, "minute").unix();
  const payload = {
    role: role + "",
    username: username + "",
    create: moment().unix(),
    exp: expTimeJWT,
  };
  return jwt.sign(payload, process.env.JWT_KEY);
}
function checkToken(token, role, username) {
  try {
    const jwtDecode = jwt.verify(token, process.env.JWT_KEY);
    return role == jwtDecode.role && username == jwtDecode.username;
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  checkToken,
};
