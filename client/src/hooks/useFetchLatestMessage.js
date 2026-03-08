import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response?.error) {
        console.error("Error getting messages...", response.error);
        return;
      }

      const lastMessage = response[response.length - 1];
      console.log(lastMessage);
      // const checkResult = await messageFraudCheck(lastMessage?.text);
      // lastMessage.warning = checkResult.warning;

      setLatestMessage(lastMessage);
    };

    getMessage();
  }, [newMessage, notifications]);

  return { latestMessage };
};
