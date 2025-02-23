import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRequest } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const user = localStorage.getItem('User');

        if (user) {
            try {
                setUser(JSON.parse(user));
            } catch (error) {
                return localStorage.removeItem('User');
            }
        }
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();
            setIsRegisterLoading(true);
            setRegisterError(null);

            const response = await postRequest(
                `${baseUrl}/users/register`,
                JSON.stringify(registerInfo)
            );

            setIsRegisterLoading(false);

            if (response.error) {
                return setRegisterError({
                    error: true,
                    message: response.message,
                });
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
        },
        [registerInfo]
    );

    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoginLoading(true);
            setLoginError(null);

            const response = await postRequest(
                `${baseUrl}/users/login`,
                JSON.stringify(loginInfo)
            );

            setIsLoginLoading(false);

            if (response.error) {
                setIsLoginLoading(false);
                return setLoginError({
                    error: true,
                    message: response.message,
                });
            }

            localStorage.setItem('User', JSON.stringify(response));
            setUser(response);
        },
        [loginInfo]
    );

    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerUser,
                registerInfo,
                registerError,
                isRegisterLoading,
                updateRegisterInfo,
                logoutUser,
                loginUser,
                loginInfo,
                loginError,
                isLoginLoading,
                updateLoginInfo,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
