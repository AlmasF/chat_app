import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } =
        useContext(ChatContext);

    return (
        <Container>
            <PotentialChats />
            {userChats && userChats.length < 1 ? null : (
                <Stack
                    direction='horizontal'
                    gap={4}
                    className='align-items-center'>
                    <Stack
                        className='messages-box flex-grow-0 pe-3'
                        gap={3}>
                        {isUserChatsLoading && <p>Loading...</p>}
                        {userChats &&
                            userChats.map((chat, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => updateCurrentChat(chat)}>
                                        <UserChat
                                            chat={chat}
                                            senderUser={user}
                                        />
                                    </div>
                                );
                            })}
                    </Stack>
                    <ChatBox />
                </Stack>
            )}
        </Container>
    );
};

export default Chat;

// Resources:
//https://youtu.be/1Qsfdll1Zw0?si=2bTtoTKswQ92ZSeR&t=1459
