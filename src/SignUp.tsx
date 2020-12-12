import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import forge from 'node-forge';

import './SignUp.css';

function Signup() {
  const history = useHistory();
  const [signUpMessage, setSignUpMessage] = useState('');
  const [signUp, setSignUp] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { rsa } = forge.pki;

  function SetUpKeys(password) {
    rsa.generateKeyPair({ bits: 1024, workers: 2 }, (err, keypair) => {
      if (err === null) {
        const pemPublic = forge.pki.publicKeyToPem(keypair.publicKey);
        const encryptedPemPrivate = forge.pki.encryptRsaPrivateKey(keypair.privateKey, password);
        fetch('/api/insertkey', {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          mode: 'no-cors',
          body: JSON.stringify({
            public: pemPublic,
            private: encryptedPemPrivate,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              history.push('/mainmenu');
            } else setSignUpMessage(data.message);
          })
          .catch((error) => {
            <div className="signup-error-box">
              Malformed message was recieved:
              {error}
            </div>;
          });
      }
    });
  }

  function HandleSignUp() {
    const tusername = signUp.username.trim();
    const tpassword1 = signUp.password1.trim();
    const tpassword2 = signUp.password2.trim();

    if (tusername === '' || tpassword1 === '' || tpassword2 === '') {
      setSignUpMessage('Please fill in all fields.');
    } else if (tpassword1.length < 10) {
      setSignUpMessage('Password is not long enough.');
    } else if (/(?=.\s)/.exec(tpassword1)) {
      setSignUpMessage('Password cannot have whitespace');
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.exec(tpassword1)) {
      setSignUpMessage('Password does not meet all requirements');
    } else if (tpassword1 !== tpassword2) {
      setSignUpMessage('Passwords do not match.');
    } else {
      fetch('/api/signup', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        mode: 'no-cors',
        body: JSON.stringify({
          username: tusername,
          password: tpassword1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            SetUpKeys(tpassword1);
          } else setSignUpMessage(data.message);
        })
        .catch((error) => {
          <div className="signup-error-box">
            Malformed message was recieved:
            {error}
          </div>;
        });
      history.push('/mainmenu');
    }
  }

  function HandleInput(event) {
    const { value: NewValue } = event.target;
    if (event.target.name === 'password1') {
      const requirement1 = document.getElementById('requirement1') as HTMLElement;
      const requirement2 = document.getElementById('requirement2') as HTMLElement;
      const requirement3 = document.getElementById('requirement3') as HTMLElement;
      const requirement4 = document.getElementById('requirement4') as HTMLElement;

      if (NewValue.length >= 10) {
        requirement1.style.textDecoration = 'line-through';
      } else {
        requirement1.style.textDecoration = 'none';
      }
      if (/(?=.*[a-z])/.exec(NewValue)) {
        requirement2.style.textDecoration = 'line-through';
      } else {
        requirement2.style.textDecoration = 'none';
      }
      if (/(?=.*[A-Z])/.exec(NewValue)) {
        requirement3.style.textDecoration = 'line-through';
      } else {
        requirement3.style.textDecoration = 'none';
      }
      if (/(?=.*\d)/.exec(NewValue)) {
        requirement4.style.textDecoration = 'line-through';
      } else {
        requirement4.style.textDecoration = 'none';
      }
    }
    setSignUp({
      ...signUp,
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
          defaultValue={signUp.username}
          onChange={HandleInput}
          autoComplete="off"
        />
        <div className="form-label">Password</div>
        <input
          type="password"
          name="password1"
          className="login-password"
          defaultValue={signUp.password1}
          onChange={HandleInput}
          autoComplete="off"
        />
        <div className="form-label">Type password again</div>
        <input
          type="password"
          name="password2"
          className="login-password"
          defaultValue={signUp.password2}
          onChange={HandleInput}
          autoComplete="off"
        />
      </form>
      <li id="requirement1">At least 10 characters</li>
      <li id="requirement2">At least 1 lowercase letter</li>
      <li id="requirement3">At least 1 capital letter</li>
      <li id="requirement4">At least 1 digit</li>
      <div>{signUpMessage}</div>
      <button type="button" value="Signup" onClick={HandleSignUp}>Sign Up</button>
    </div>
  );
}

export default Signup;
