import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Accordion, Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats && userChats.length < 1 ? null : (
        <Stack gap={4} className="align-items-center flex-lg-row">
          <Stack
            className="messages-box flex-grow-0 pe-3 d-none d-lg-flex"
            gap={3}
          >
            {isUserChatsLoading && <p>Загрузка...</p>}
            {userChats &&
              userChats.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} senderUser={user} />
                  </div>
                );
              })}
          </Stack>

          <Accordion className="w-100 d-block d-lg-none">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Список открытых чатов</Accordion.Header>
              <Accordion.Body
                className="p-0 overflow-hidden"
                style={{ background: "rgb(40 40 40)" }}
              >
                {isUserChatsLoading && <p>Загрузка...</p>}
                {userChats &&
                  userChats.map((chat, index) => {
                    return (
                      <div key={index} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} senderUser={user} />
                      </div>
                    );
                  })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;

// Resources:
//https://youtu.be/1Qsfdll1Zw0?si=v79VBum567UY49aa&t=3552
