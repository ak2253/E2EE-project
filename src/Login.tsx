import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [loginMessage, setLoginMessage] = useState('');
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  function ToSignUp() {
    history.push('./signup');
  }

  function HandleLogin() {
    const tusername = login.username.trim();
    const tpassword = login.password.trim();

    if (tusername === '' || tpassword === '') {
      setLoginMessage('Please fill in both fields.');
    } else {
      fetch('/api/login', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        mode: 'no-cors',
        body: JSON.stringify({
          username: tusername,
          password: tpassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            history.push('/mainmenu');
          } else setLoginMessage(data.message);
        })
        .catch((error) => {
          <div className="login-error-box">
            Malformed message was recieved:
            {error}
          </div>;
        });
    }
  }

  function HandleInput(event) {
    const { value: NewValue } = event.target;
    setLogin({
      ...login,
      [event.target.name]: NewValue,
    });
  }

  return (
    <div className="LoginBox">
        <form className="login-form">
          <div className="form-label">Username</div>
          <input
            type="text"
            name="username"
            className="login-username"
            defaultValue={login.username}
            onChange={HandleInput}
            autoComplete="off"
          />
          <div className="form-label">Password</div>
          <input
            type="text"
            name="password"
            className="login-password"
            defaultValue={login.password}
            onChange={HandleInput}
            autoComplete="off"
          />
        </form>
      <button type="button" value="Login" onClick={HandleLogin}>Login</button>
      <button type="button" value="Signup" onClick={ToSignUp}>Sign Up</button>
      <div>{loginMessage}</div>
    </div>
  );
}

export default Login;
