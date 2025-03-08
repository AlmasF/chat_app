import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services"

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);
    console.log('latestMessage', chat)

    useEffect(() => {
        const getMessage = async () => {
            console.log('chat', chat)
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if (response?.error) {
                console.log("Error getting messages...", response.error);
                return;
            }

            const lastMessage = response[response.length - 1];

            setLatestMessage(lastMessage);
        };

        getMessage();
    }, [newMessage, notifications]);

    return { latestMessage };
};