const express = require("express");
const Levi = require("../Brain/Dimaag");
const Chat = require("../Mongo/Models/chatSchema");
const router = express.Router();
const authMiddleware = require("../UserRoutes/authMiddleware");
router.route("/prompt").post(authMiddleware, async (req, res) => {
  try {
    const { prompt, user} = req.body;
    console.log(user)
    const response = await Levi(prompt);
    console.log(response);
    const newChat = new Chat({
      user_id: user, 
      userMessage: prompt,
      leviResponse: response,
    });

    await newChat.save();
    res.status(200).json({ Ai_reply: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/history").get(authMiddleware, async (req, res) => {
   try {
     const { user } = req.query; 
     const chats = await Chat.find({ user_id: user }).sort({ createdAt: -1 }).exec();
     res.status(200).json(chats);
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Internal server error" });
   }
 });

module.exports = router;
