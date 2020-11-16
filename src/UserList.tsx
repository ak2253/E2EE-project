import React, { useEffect, useState } from 'react';
import './UserList.css';

type User = {
  id: number,
  username: String
};

interface Props {
  setMessageWith: (name: String) => void;
}

function UserList(props: Props) {
  const { setMessageWith } = props;
  const [users, setUsers] = useState<Array<User>>([]);
  function toggleMessage(event) {
    setMessageWith(event.target.innerHTML);
  }
  useEffect(() => {
    fetch('/api/userlist')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => (<div className="user-list">{error}</div>));
  }, []);
  return (
    <div className="user-list">
      {users.map((row, index) => (
        <div
          role="button"
          className="user-contact"
          key={row.id}
          tabIndex={index}
          onClick={toggleMessage}
          onKeyDown={toggleMessage}
        >
          <div>{row.username}</div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
