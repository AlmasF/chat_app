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

    console.log(user);

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

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                registerError,
                isRegisterLoading,
                updateRegisterInfo,
                registerUser,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
