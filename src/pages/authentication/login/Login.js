import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../../context/authContext';

function Login() {
  const { email, setEmail, password, setPassword, onLogin } = useAuthValue();
  const navigate = useNavigate();

  return (
    <div className={style.loginPage_formContainer}>
      <form className={style.loginPage_form} onSubmit={(e) => onLogin(e, navigate)}>
        <h2 className={style.loginPage_title}>Sign In</h2>
        <input
          type="email"
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

        <button className={style.loginPage_btn}>Login</button>
        <Link to="/signup">
          <p>Or SignUp instead</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
