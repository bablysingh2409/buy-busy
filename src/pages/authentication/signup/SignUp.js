import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SignUp.module.css';
import { ToastContainer, toast } from 'react-toastify';

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  console.log(auth?.currentUser?.email);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast('signup successfully');
      navigate('/login');
    } catch (error) {
      toast(error.code);
    }
  };

  return (
    <div className={style.registerPage_formContainer}>
      <form className={style.registerPage_form} onSubmit={handleSignUp}>
        <h2 className={style.registerPage_title}>Sign Up</h2>
        <input
          type="text"
          className={style.registerPage_loginInput}
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className={style.registerPage_loginInput}
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.registerPage_loginInput}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={style.registerPage_btn}>SignUp</button>
      </form>
    </div>
  );
}
