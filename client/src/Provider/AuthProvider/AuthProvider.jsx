import { createContext, useState } from "react";
import app from "../../firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, signInWithPopup} from 'firebase/auth'

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const login = (email, password) => {
        setLoading(false)
        return signInWithPopup(auth, email, password)

    }

    const register = (email,password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const authInfo ={
        user,
        loading,
        login,
        register
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;