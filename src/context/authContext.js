import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

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
        // setLogin(true);
        setLoginUser(user.uid);
        console.log('active user-', user.uid);
      } else {
        console.log('no active user');
        // setLogin(false);
        setLoginUser('');
      }
    });
  }, []);

  const onLogin = (e, navigate) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // setLoginUser(user.uid);
        navigate('/');
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code--${errorCode}, error message--${errorMessage}`);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // setLoginUser('');
        console.log('sign out successfully');
      })
      .catch((error) => {
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
