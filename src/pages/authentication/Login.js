import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="loginPage_formContainer">
      <form className="loginPage_form">
        <input
          className="loginPage_loginInput"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="loginPage_loginInput"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginPage_btn">SignUp</button>
      </form>
    </div>
  );
}

export default Login;
