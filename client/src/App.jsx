import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Chat from "./pages/Chat"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NavBar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={<Chat />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Container>
    </>
  )
}

export default App
