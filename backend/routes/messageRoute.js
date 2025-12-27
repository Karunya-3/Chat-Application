const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to get all messages
router.get('/', messageController.getMessages);
// Route to post a new message
router.post('/', messageController.createMessage);
// Route to delete all messages
router.delete('/', messageController.deleteMessage);

module.exports = router;