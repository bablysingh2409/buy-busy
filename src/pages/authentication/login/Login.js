import { useState } from 'react';
import style from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={style.loginPage_formContainer}>
      <form className={style.loginPage_form}>
        <h2 className={style.loginPage_title}>Sign In</h2>
        <input
          type="text"
          className={style.loginPage_loginInput}
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={style.loginPage_loginInput}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={style.loginPage_btn}>SignUp</button>
        <Link to="/signup">
          <p>Or SignUp instead</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
