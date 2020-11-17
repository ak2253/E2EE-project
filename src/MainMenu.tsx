import React, { useState } from 'react';

import UserList from './UserList';
import Messages from './Messages';

function MainMenu() {
  const [messageWith, setMessageWith] = useState<String>('');
  if (messageWith === '') {
    return <UserList setMessageWith={setMessageWith} />;
  }
  return (
    <div>
      <UserList setMessageWith={setMessageWith} />
      <Messages messageWith={messageWith} />
    </div>
  );
}

export default MainMenu;
