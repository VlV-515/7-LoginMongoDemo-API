const express = require("express");
const router = express.Router();
const loginSchema = require("../models/loginModel");
const loginController = require("../controllers/loginController");

//SignUp
router.post("/signup", (req, res) => {
  loginSchema(req.body)
    .save()
    .then((data) => res.json({ msg: "ok" }))
    .catch(() => res.json({ msg: "Error al hacer signup" }));
});
//SignIn
router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  loginSchema
    .find({ username, password })
    .then((user) => {
      if (user.length == 0) {
        res.json({ msg: "Credenciales invalidas" });
        return;
      }
      const id = String(user[0]._id);
      const username = String(user[0].username);
      const role = String(user[0].role);
      const params = {
        msg: "ok",
        id: id,
        username: username,
        role: role,
        token: loginController.generateToken(id, role),
      };
      res.json(params);
    })
    .catch(() => res.json({ msg: "Error al hacer signin" }));
});
/* CRUD DEFAULT */
//Create
router.post("/", (req, res) => {
  loginSchema(req.body)
    .save()
    .then(() => res.json({ msg: "ok" }))
    .catch(() => res.json({ msg: "Error al insertar un usuario" }));
});
//Read All
router.get("/", (req, res) => {
  loginSchema
    .find()
    .then((data) => res.json(data))
    .catch(() => res.json({ msg: "Error al consultar todos los usuarios" }));
});
//Read One
router.get("/:id", (req, res) => {
  const { id } = req.params;
  loginSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch(() => res.json({ msg: "Error al consultar un usuario" }));
});
//Delete One
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  loginSchema
    .deleteOne({ _id: id })
    .then(() => res.json({ msg: "ok" }))
    .catch(() => res.json({ msg: "Error al eliminar un usuario" }));
});

module.exports = router;
