import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Register = () => {
  const {
    registerUser,
    updateRegisterInfo,
    registerInfo,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "15%",
          }}
        >
          <Col xs={12} sm={8} md={6}>
            <Stack gap={3}>
              <h2>Регистрация</h2>
              <Form.Control
                type="text"
                placeholder="Имя"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    name: e.target.value,
                  })
                }
              />
              <Form.Control
                type="email"
                placeholder="Электронная почта"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Пароль"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading
                  ? "Создаем аккаунт..."
                  : "Зарегистрироваться"}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
