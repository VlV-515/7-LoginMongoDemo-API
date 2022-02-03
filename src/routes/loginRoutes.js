const express = require("express");
const router = express.Router();
const loginSchema = require("../models/loginModel");

//Create
router.post("/", (req, res) => {
  loginSchema(req.body)
    .save()
    .then(() => res.json({ msg: "ok" }))
    .catch((e) => {
      res.json({ msg: "Error al insertar un usuario" });
    });
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
//TODO: Generate Token
//TODO: Check Token
//TODO: Update Token
module.exports = router;
