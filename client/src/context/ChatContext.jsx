import { createContext, useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import io from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState(null);

    console.log('notifications', notifications);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (!socket) return;
        socket.emit('addNewUser', user?._id);
        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket]);

    // send message

    useEffect(() => {
        if (!socket) return;

        const recipientId = currentChat?.members.find((id) => id !== user._id);

        socket.emit('sendMessage', { ...newMessage, recipientId });
    }, [newMessage]);

    // receive message and notification
    useEffect(() => {
        if (!socket) return;

        socket.on('getMessage', (message) => {
            if (currentChat?._id !== message.chatId) return;

            setMessages((prev) => [...prev, message]);
        });

        socket.on('getNotification', (notification) => {
            const isChatOpen = currentChat?.members.some((id) => {
                return id === notification.senderId;
            });

            if (isChatOpen) {
                setNotifications((prev) => [
                    ...prev,
                    { ...notification, isRead: true },
                ]);
            } else {
                setNotifications((prev) => [...prev, notification]);
            }
        });

        return () => {
            socket.off('getMessage');
            socket.off('getNotification');
        };
    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.error('Error fetching users', response.message);
            }

            const pChats = response.filter((u) => {
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
            setAllUsers(response);
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

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(
                `${baseUrl}/messages/${currentChat?._id}`
            );

            setIsMessagesLoading(false);

            if (response.error) {
                return setMessagesError({
                    error: true,
                    message: response.message,
                });
            }

            setMessages(response);
        };

        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(
        async ({ textMessage, senderId, currentChatId, setTextMessage }) => {
            if (!textMessage) return console.log('Message is empty');
            const response = await postRequest(
                `${baseUrl}/messages`,
                JSON.stringify({
                    text: textMessage,
                    senderId,
                    chatId: currentChatId,
                })
            );

            if (response.error) {
                return setSendTextMessageError({
                    error: true,
                    message: response.message,
                });
            }

            setNewMessage(response);
            setMessages((prev) => [...prev, response]);
            setTextMessage('');
        },
        []
    );

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

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

    const markAllNotificationsAsRead = useCallback((notifications) => {
        const mNotifications = notifications.map((n) => ({
            ...n,
            isRead: true,
        }));

        setNotifications(mNotifications);
    }, []);

    const markNotificationAsRead = useCallback(
        (n, userChats, user, notifications) => {
            //find chat to open

            const desiredChat = userChats.find((chat) => {
                const chatMembers = [user._id, n.senderId];
                const isDesiredChat = chat?.members?.every((m) => {
                    return chatMembers.includes(m);
                });

                return isDesiredChat;
            });

            // mark notification as read
            const mNotifications = notifications.map((el) => {
                if (n.senderId === el.senderId) {
                    return { ...el, isRead: true };
                } else {
                    return el;
                }
            });

            updateCurrentChat(desiredChat);
            setNotifications(mNotifications);
        },
        []
    );

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
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
                currentChat,
                sendTextMessage,
                onlineUsers,
                notifications,
                allUsers,
                markAllNotificationsAsRead,
                markNotificationAsRead,
            }}>
            {children}
        </ChatContext.Provider>
    );
};
