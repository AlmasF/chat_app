import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services"

export const useFetchRecipientUser = ({ chat, senderUser }) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.members?.find((id) => {
        return id !== senderUser?._id;
    });

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;
            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            if (response.error) {
                setError(response.error);
                return null;
            }
            setRecipientUser(response);
        };
        getUser()
    }, [])

    return { recipientUser, error };
};