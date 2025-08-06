import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();
  

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

//login user
const loginUser =async (email, password) =>{
    return await signInWithEmailAndPassword(auth, email, password);
}


  // Google Sign In
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };


  //logout the user
const logout = ()=>{
  return signOut(auth)
}

// manage user

useEffect(() =>{
const unsubscribe = onAuthStateChanged(auth,(user)=>{
  setCurrentUser(user);
  setLoading(false);
  if(user){
    const { email, displayName ,photoURL} = user;
    const userData = {
      email, username : displayName, photo :photoURL
    }
  }
})
return () => unsubscribe();
},[])


  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
