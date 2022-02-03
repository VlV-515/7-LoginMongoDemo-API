const moment = require("moment");
const jwt = require("jsonwebtoken");
const expTimeJWT = moment().add(5, "minute").unix();
const bcrypt = require("bcryptjs");
require("dotenv").config();

function generateToken(id, role) {
  const payload = {
    id: id + "",
    role: role + "",
    create: moment().unix(),
    exp: expTimeJWT,
  };
  return jwt.sign(payload, process.env.JWT_KEY);
}
function checkToken(token, role) {
  try {
    const jwtDecode = jwt.verify(token, process.env.JWT_KEY);
    return role == jwtDecode.role;
  } catch (error) {
    return false;
  }
}
function updateToken(token) {
  const jwtDecode = jwt.verify(token, process.env.JWT_KEY);
  const payload = {
    id: jwtDecode.id,
    role: jwtDecode.role,
    create: moment().unix(),
    exp: expTimeJWT,
  };
  return jwt.sign(payload, process.env.JWT_KEY);
}
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
function checkPassword(passFront, passDB) {
  return bcrypt.compareSync(passFront, passDB);
}
module.exports = {
  generateToken,
  checkToken,
  updateToken,
  hashPassword,
  checkPassword,
};
