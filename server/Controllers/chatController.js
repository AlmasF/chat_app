const chatModel = require('../Models/chatModel');

// createChat
// findUserChats
// findChat

const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUserChats = async (req, res) => {
    const { userId } = req.params;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] }
        });

        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] }
        });

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


module.exports = {
    createChat,
    findUserChats,
    findChat
};

// 08:24
// https://www.youtube.com/watch?v=LRQu77qJawU&list=PL63c_Ws9ecIRZ6njHRi3cuCkNSfzqyLBn&index=11&ab_channel=ChaooCharles
