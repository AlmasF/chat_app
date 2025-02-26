import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { userChats, isUserChatsLoading, userChatsError } =
        useContext(ChatContext);
    return <>Chat</>;
};

export default Chat;

// Resources:
// https://www.youtube.com/watch?v=zM-zwHfReEY&list=PL63c_Ws9ecIRZ6njHRi3cuCkNSfzqyLBn&index=14&ab_channel=ChaooCharles
