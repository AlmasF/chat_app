import { useContext } from "react";
import { Col, Container, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "fit-content" }}>
      <Container>
        <Row>
          <Col>
            {user?.name && (
              <span className="text-warning">
                Вошли как пользователь: {user?.name}
              </span>
            )}
          </Col>
        </Row>
        <Nav>
          <Stack direction="horizontal" gap={2}>
            {user && (
              <>
                <Notification />
                <Link
                  onClick={() => logoutUser()}
                  className="link-light text-decoration-none"
                >
                  Выйти
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Зарегистрироваться
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
