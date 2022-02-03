const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
function checkPassword(passFront, passDB) {
  return bcrypt.compareSync(passFront, passDB);
}
module.exports = {
  hashPassword,
  checkPassword,
};
