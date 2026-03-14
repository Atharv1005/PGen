import express, { Request, Response } from "express";
import Chat from "../models/Chat";
import Message from "../models/Message";

const router = express.Router();

/**
 * Create new chat
 */
router.post("/create", async (req: Request, res: Response) => {

  try {

    const { userId1, userId2 } = req.body;

    const existingChat = await Chat.findOne({
      participants: { $all: [userId1, userId2] }
    });

    if (existingChat) {

      await existingChat.populate("participants", "username walletAddress");

      return res.json(existingChat);

    }

    const chat = await Chat.create({
      participants: [userId1, userId2]
    });
    await chat.populate("participants", "username walletAddress");

    await chat.save();

    res.json(chat);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Server error" });

  }

});


// Get chats for a user
router.get("/user/:userId", async(req,res)=>{
  try{
    const chats=await Chat.find({
      participants: req.params.userId
    })
    .populate("participants", "username walletAddress")
    .populate({
      path: "lastMessage",
      select: "content createdAt sender"
    })
    .sort({ updatedAt: -1, createdAt: -1});

    res.json(chats);
  } catch (err) {
    res.status(500).json({message: "Server Error"});
  }
});

/**
 * Get messages in chat
 */
router.get("/:chatId/messages", async (req: Request, res: Response) => {

  try {

    const messages = await Message.find({
      chatId: req.params.chatId
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Server error" });

  }

});


/**
 * Send message
 */
router.post("/:chatId/message", async (req: Request, res: Response) => {

  try {

    const { senderId, content } = req.body;

    const message = new Message({
      chatId: req.params.chatId,
      sender: senderId,
      content
    });

    await message.save();

      await Chat.findByIdAndUpdate(
        req.params.chatId, 
        { lastMessage: message._id },
        {updatedAt: new Date()}
      );

    res.json(message);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Server error" });

  }

});

export default router;