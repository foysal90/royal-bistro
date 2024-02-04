import { createContext, useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import {GoogleAuthProvider, createUserWithEmailAndPassword,getAuth,onAuthStateChanged,signInWithEmailAndPassword,signInWithPopup,signOut, updateProfile}from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  //google login function
  const googleLogIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  //normal login function
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  //creating new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //logout function
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }
 

  //updating user profile
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
    updateUserprofile,
    googleLogIn
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
