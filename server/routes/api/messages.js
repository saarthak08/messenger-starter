const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;


    // fetch the conversation with sender id & recipient id.
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    // if conversation exists with given senderId & recipient id & if we already know conversation id.
    if (conversation && conversationId) {
      // then => if conversation's id & conversationId passed in request are same or not.
      if (conversation.id === conversationId) {
        const message = await Message.create({ senderId, text, conversationId });
        return res.json({ message, sender });
      } else {
        return res.sendStatus(401);
      }
    }

    // if no conversation exits, create a new conversation.
    if (!conversation) {

      // if loggedIn user's id & sender's id passed in request don't match. => Unauthorized.
      if (senderId !== sender.id) {
        res.sendStatus(401);
      }

      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers[senderId]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
