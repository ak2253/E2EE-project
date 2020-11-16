import React, { useState } from 'react';

interface Props {
  messageTo: String;
}

function sendMessage(value, sendTo) {
  fetch('/api/message/input', {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    mode: 'no-cors',
    body: JSON.stringify({
      to: sendTo,
      message: value,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      console.log('success');
    })
    .catch((error) => {
      <div className="login-error-box">
        Malformed message was recieved:
        {error}
      </div>;
    });
}

function TextBox(props: Props) {
  const { messageTo } = props;
  const [message, setMessage] = useState('');
  function handleButton() {
    sendMessage(message, messageTo);
    setMessage('');
  }
  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage(message, messageTo);
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
