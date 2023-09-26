import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';

export const authContext = createContext();

export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

function CustomLoginContext({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, setLoginUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user.uid);
        console.log('active user-', user.uid);
      } else {
        console.log('no active user');
        setLoginUser('');
      }
    });
  }, []);

  const onLogin = (e, navigate) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        toast('login successfully');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(error.code);
        console.log(`error code--${errorCode}, error message--${errorMessage}`);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successfully');
        toast('logout successfully');
      })
      .catch((error) => {
        toast(error);
        console.log('error----', error);
      });
  };

  return (
    <authContext.Provider
      value={{ email, setEmail, password, setPassword, onLogin, loginUser, logOut }}
    >
      {children}
    </authContext.Provider>
  );
}

export default CustomLoginContext;
