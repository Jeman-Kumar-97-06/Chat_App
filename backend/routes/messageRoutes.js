const {sendMessage,getMessages} = require('../controllers/messageControllers')
const requireAuth = require('../middleware/requireAuth');

const express = require('express');

const router  = express.Router();

router.use(requireAuth);

router.get('/:id',getMessages);
router.post('/send/:id',sendMessage);

module.exports = router;