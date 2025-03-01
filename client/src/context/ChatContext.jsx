import { createContext, useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.error('Error fetching users', response.message);
            }

            const pChats = response.filter((u) => {
                console.log('u: ', u);
                let isChatCreated = false;
                if (user?._id === u._id) return false;

                if (userChats) {
                    console.log('User Chats from getUsers: ', userChats);
                    isChatCreated = userChats?.some((chat) => {
                        return (
                            chat?.members[0] === u._id ||
                            chat?.members[1] === u._id
                        );
                    });
                }

                return isChatCreated ? false : true;
            });

            setPotentialChats(pChats);
        };

        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(
                    `${baseUrl}/chats/${user._id}`
                );

                setIsUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError({
                        error: true,
                        message: response.message,
                    });
                }
                console.log('User Chats from getUserChats: ', response);
                setUserChats(response);
            }
        };

        getUserChats();
    }, [user]);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(
            `${baseUrl}/chats`,
            JSON.stringify({ firstId, secondId })
        );
        if (response.error) {
            return console.error('Error creating chat', response.message);
        }

        setUserChats((prev) => [...prev, response]);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                setUserChats,
                isUserChatsLoading,
                setIsUserChatsLoading,
                userChatsError,
                setUserChatsError,
                potentialChats,
                createChat,
            }}>
            {children}
        </ChatContext.Provider>
    );
};
