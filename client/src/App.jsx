import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChatContextProvider } from './context/ChatContext';

function App() {
    const { user } = useContext(AuthContext);
    return (
        <>
            <ChatContextProvider user={user}>
                <NavBar />
                <Container className='text-secondary'>
                    <Routes>
                        <Route
                            path='/'
                            element={user ? <Chat /> : <Login />}
                        />
                        <Route
                            path='/register'
                            element={user ? <Chat /> : <Register />}
                        />
                        <Route
                            path='/login'
                            element={user ? <Chat /> : <Login />}
                        />
                        <Route
                            path='*'
                            element={<Navigate to='/' />}
                        />
                    </Routes>
                </Container>
            </ChatContextProvider>
        </>
    );
}

export default App;
