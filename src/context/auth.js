import React, {useState} from 'react';
import { loginWithGoogle, auth, logout } from '../server/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = React.createContext();


const AuthProvider = (props) => {
    const [user, setUser] = useAuthState(auth);

    const login = async () => {
        const user = await loginWithGoogle();

        if (!user) {
            // TODO: Handle failed login
            //setUser(false);
        }

        //setUser(true);
    };

    setTimeout(logout, 7200000);  
    const value = { user, login };
    return <AuthContext.Provider value={value} {...props} />;
};


export { AuthContext, AuthProvider};
