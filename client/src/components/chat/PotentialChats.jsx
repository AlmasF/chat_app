import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
    const { user: authorizedUser } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

    return (
        <>
            <div className='all-users'>
                {potentialChats && potentialChats.length > 0 ? (
                    potentialChats.map((user, index) => {
                        return (
                            <div
                                key={index}
                                className='single-user'
                                onClick={() =>
                                    createChat(authorizedUser._id, user._id)
                                }>
                                {user.name}
                                <span
                                    className={
                                        onlineUsers.some(
                                            (u) => u.userId === user?._id
                                        )
                                            ? 'user-online'
                                            : 'user-offline'
                                    }></span>
                            </div>
                        );
                    })
                ) : (
                    <p>No potential chats</p>
                )}
            </div>
        </>
    );
};

export default PotentialChats;
