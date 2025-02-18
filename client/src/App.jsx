import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from "./components/Chat"
import Register from "./components/Register"
import Login from "./components/Login"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Chat />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
    </>
  )
}

export default App
