const express = require("express");
const router = express.Router();
const chatbotController = require("../Controllers/chatController");
const { verifyJWT } = require("../MiddleWares/auth");
// Route to handle creating or updating a chat session
router.post("/chatStart",verifyJWT, chatbotController.createOrUpdateChat);

// Route to get chat session by sessionId
router.get("/chatbysession",verifyJWT, chatbotController.getChatBySessionId);

// Route to get all chat sessions for a user by userId
router.get("/chatbyuser",verifyJWT, chatbotController.getChatsByUserId);

// Route to delete a specific chat session by sessionId
router.delete("/chat/session/:sessionId", chatbotController.deleteChatBySessionId);

// Route to delete all chat sessions for a specific user
router.delete("/chat/user/:userId", chatbotController.deleteChatsByUserId);

module.exports = router;
