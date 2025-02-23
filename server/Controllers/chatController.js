const chatModel = require('../Models/chatModel');

// createChat
// getUserChats
// findChat

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = new chatModel({ members: [firstId, secondId] });

        await chat.save();

        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}