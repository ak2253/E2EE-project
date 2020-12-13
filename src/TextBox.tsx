import React, { useState } from 'react';
import forge from 'node-forge';

type Message = {
  id: number,
  username_from: String,
  message: String
};

interface Props {
  messageTo: String;
  setMessages: (messages: Array<Message>) => void;
}

function TextBox(props: Props) {
  const { messageTo, setMessages } = props;
  const [message, setMessage] = useState('');
  function sendMessage(value) {
    fetch('/api/getpublic', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({
        to: messageTo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const publicKeySelf = forge.pki.publicKeyFromPem(data.public_key_self);
        const publicKeyUser = forge.pki.publicKeyFromPem(data.public_key_user);
        const encryptedSelf = publicKeySelf.encrypt(value);
        const encryptedUser = publicKeyUser.encrypt(value);
        fetch('/api/message/input', {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          mode: 'no-cors',
          body: JSON.stringify({
            to: messageTo,
            message_self: encryptedSelf,
            message_to: encryptedUser,
          }),
        })
          .then((nRes) => nRes.json())
          .then((nData) => {
            setMessages(nData.messages);
          })
          .catch((error) => {
            <div className="login-error-box">
              Malformed message was recieved:
              {error}
            </div>;
          });
      })
      .catch((error) => {
        <div className="login-error-box">
          Malformed message was recieved:
          {error}
        </div>;
      });
  }
  function handleButton() {
    sendMessage(message);
    setMessage('');
  }
  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage(message);
      setMessage('');
    }
  }
  function handleInput(event) {
    const { value: newValue } = event.target;
    setMessage(newValue);
  }
  return (
    <div className="message-menu">
      <input type="text" className="message-input" value={message} onKeyUp={handleKeyUp} onChange={handleInput} />
      <button type="button" className="message-button" value="Enter" onClick={handleButton}>
        Enter
      </button>
    </div>
  );
}

export default TextBox;
