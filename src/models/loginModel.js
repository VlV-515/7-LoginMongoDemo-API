const mongoose = require("mongoose");
const loginSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdDate: { type: String, required: true },
});
module.exports = mongoose.model("loginSchema", loginSchema);
