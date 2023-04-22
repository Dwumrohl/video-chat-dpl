import { useAuth } from '../../hooks/useAuth';
import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword } from "../../server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './styles.css';

function UnauthenticatedApp() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    //const navigate = useNavigate();

    return (
        <>
            <h2 className='unauthLbl'>Необходимо произвести вход</h2>
            <div>
            <div className="login">
                <button onClick={login} className="login">
                    Войти с помощью Google
                </button>
                </div>
            </div>
        </>
    );
}

export { UnauthenticatedApp };