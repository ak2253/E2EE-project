import React, { useState, useEffect } from 'react';
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
  const { messageWith } = props;
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
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
        setMessages(data.messages);
      })
      .catch((error) => {
        <div className="login-error-box">
          Malformed message was recieved:
          {error}
        </div>;
      });
  }, []);

  return (
    <div className="message-box">
      {messages.map((row, index) => (
        <div className="message-section" key={row.id} tabIndex={index}>
          <div className="message-username">{row.from}</div>
          <div className="message-content">{row.message}</div>
        </div>
      ))}
      <TextBox messageTo={messageWith} />
    </div>
  );
}

export default Messages;
