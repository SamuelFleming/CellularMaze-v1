const router = require("express").Router();
const {
  postGuest,
  postLogin,
  postRegister
} = require("../controllers/auth.controller");

router.post("/guest", postGuest);
router.post("/login", postLogin);
router.post("/register", postRegister);

module.exports = router;
