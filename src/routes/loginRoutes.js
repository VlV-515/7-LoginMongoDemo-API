const express = require("express");
const router = express.Router();
const loginSchema = require("../models/loginModel");
const loginController = require("../controllers/loginController");
const jwtController = require("../controllers/jwtController");

//SignUp
router.post("/signup", (req, res) => {
  //Hash Password
  req.body.password = loginController.hashPassword(req.body.password);
  loginSchema(req.body)
    .save()
    .then((data) => res.status(200).json({ msg: "ok" }))
    .catch(() => res.status(400).json({ msg: "Error al hacer signup" }));
});
//SignIn
router.post("/signin", (req, res) => {
  const { username, password: passFront } = req.body;
  loginSchema
    .find({ username })
    .then((response) => {
      //Check Username
      if (response.length == 0) {
        return res.status(400).json({ msg: "Usuario invalido" });
      }
      //Check Password
      const { password: passDB } = response[0];
      if (!loginController.checkPassword(passFront, passDB)) {
        return res.status(400).json({ msg: "Contraseña invalida" });
      }
      //All OK
      const id = String(response[0]._id);
      const username = String(response[0].username);
      const role = String(response[0].role);
      const params = {
        msg: "ok",
        id: id,
        username: username,
        role: role,
        token: jwtController.generateToken(id, role),
      };
      res.status(200).json(params);
    })
    .catch(() => res.status(400).json({ msg: "Error al hacer signin" }));
});
//Check Token
router.get("/checkToken", (req, res) => {
  const { token, role } = req.headers;
  if (jwtController.checkToken(token, role)) {
    return res.status(200).json({
      msg: "ok",
      newToken: jwtController.updateToken(token),
    });
  }
  res.status(400).json({ msg: "Error de autorizacion" });
});
/* CRUD DEFAULT */
/* CRUD DEFAULT */
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
