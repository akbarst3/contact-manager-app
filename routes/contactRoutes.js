const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)
router.route("/").get(contactController.getAllContacts).post(contactController.addNewContact);

router.route("/:id").get(contactController.getContactById).put(contactController.updateContactById).delete(contactController.deleteContactById);

module.exports = router;