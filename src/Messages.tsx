import React, { useState } from 'react';
import './Messages.css';

import TextBox from './TextBox';

type Message = {
  id: number,
  username_from: String,
  message: String
};

interface Props {
  messageWith: String;
}

function Messages(props: Props) {
  const [currentWith, setCurrentWith] = useState<String>('');
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { messageWith } = props;
  if (messageWith !== currentWith && messageWith !== '') {
    setCurrentWith(messageWith);
    fetch('/api/message', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'no-cors',
      body: JSON.stringify({
        to: messageWith,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setMessages([]);
        } else {
          setMessages(data.messages);
        }
      })
      .catch((error) => {
        <div className="login-error-box">
          Malformed message was recieved:
          {error}
        </div>;
      });
  }
  return (
    <div className="message-box">
      {messages.map((row, index) => (
        <div className="message-section" key={row.id} tabIndex={index}>
          <div className="message-username">{row.username_from}</div>
          <div className="message-content">{row.message}</div>
        </div>
      ))}
      <TextBox messageTo={messageWith} setMessages={setMessages} />
    </div>
  );
}

export default Messages;
