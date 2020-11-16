import React from 'react';

import TextBox from './TextBox';

interface Props {
  messageWith: String;
}

function Messages(props: Props) {
  const { messageWith } = props;
  return (
    <div>
      <TextBox messageTo={messageWith} />
    </div>
  );
}

export default Messages;
