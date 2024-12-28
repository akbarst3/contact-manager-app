const express = require('express');
const router = express.Router();
const {userRegister, userLogin, currentLogin} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.route("/register").post(userRegister);

router.route("/login").post(userLogin);
router.route("/current").get(validateToken, currentLogin);

module.exports = router;