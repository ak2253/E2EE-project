import React from 'react';

interface Props {
  messageWith: String;
}

function Messages(props: Props) {
  const { messageWith } = props;
  return <div>{messageWith}</div>;
}

export default Messages;
