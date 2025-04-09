const requireAuth = require('../middleware/requireAuth');
const { getUsersForSiderbar } = require('../controllers/userControllers');

const express = require('express');
const router  = express.Router();

router.use(requireAuth);

router.get('/',getUsersForSiderbar)

module.exports = router;