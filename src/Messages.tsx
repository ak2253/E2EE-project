import React from 'react';
import './Messages.css';

import TextBox from './TextBox';

interface Props {
  messageWith: String;
}

function Messages(props: Props) {
  const { messageWith } = props;
  return (
    <div className="message-box">
      <TextBox messageTo={messageWith} />
    </div>
  );
}

export default Messages;
