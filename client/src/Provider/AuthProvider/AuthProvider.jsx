import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {createUserWithEmailAndPassword,getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut, updateProfile}from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserprofile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName : name,
        photoURL : photo
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('CURRENT USER',currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    login,
    createUser,
    logOut,
    updateUserprofile
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
