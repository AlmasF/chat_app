import { useEffect, useState } from "react";

export const useFetchRecipient = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => {
        return id !== user?._id;
    });
};