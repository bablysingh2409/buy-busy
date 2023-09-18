import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  console.log(auth?.currentUser?.email);

  const handleSignUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    navigate('/login');
  };

  return (
    <div className="registerPage_formContainer">
      <form className="registerPage_form" onSubmit={handleSignUp}>
        <input
          className="registerPage_loginInput"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="registerPage_loginInput"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerPage_loginInput"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerPage_btn">SignUp</button>
      </form>
    </div>
  );
}
