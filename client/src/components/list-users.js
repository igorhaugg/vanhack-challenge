import React from 'react';
import { css } from 'emotion';

import CheckImage from './images/check_b.png';
import NotCheckImage from './images/not_checked.png';

const UserList = ({ users, currentUser, removeUser, editUser }) => (
  <table className={tableStyle}>
    <thead>
      <tr className={table__row}>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Active</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users &&
        users.map(user => {
          const isCurrentUser = currentUser === user._id;
          const currentUserStyle = isCurrentUser ? `${table__row} ${currentStyle}` : `${table__row}`;
          return (
            <tr key={user._id} className={currentUserStyle}>
              <td className={table__cell}>{user.name}</td>
              <td className={table__cell}>{user.email}</td>
              <td className={table__cell}>
                {isCurrentUser ? (
                  <div className={item__checkbox}>
                    <img src={CheckImage} alt='Checked' />
                  </div>
                ) : (
                  <div className={item__checkbox} onClick={() => editUser(user, 'admin')}>
                    <img src={user.admin ? CheckImage : NotCheckImage} alt='Checked' />
                  </div>
                )}
              </td>
              <td className={table__cell}>
                {isCurrentUser ? (
                  <div className={item__checkbox}>
                    <img src={CheckImage} alt='Checked' />
                  </div>
                ) : (
                  <div className={item__checkbox} onClick={() => editUser(user, 'active')}>
                    <img src={user.active ? CheckImage : NotCheckImage} alt='Checked' />
                  </div>
                )}
              </td>
              <td className={table__cell}>
                {isCurrentUser ? (
                  <i className={`fas fa-trash ${item__icon}`} />
                ) : (
                  <i className={`fas fa-trash ${item__icon}`} onClick={() => removeUser(user)} />
                )}
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>
);

const tableStyle = css`
  border-collapse: collapse;
  width: 100%;

  tbody tr:nth-child(odd) {
    background-color: #f4f4f4;
  }
`;

const table__row = css`
  border: 1px solid transparent;
  color: #333;
  font-family: var(--table-font);
  text-align: center;
  > * {
    padding: 1rem 0;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;

const table__cell = css`
  min-width: 7rem;
`;

const item__icon = css`
  cursor: pointer;
  height: 2rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
  transition: transform 0.15s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const item__checkbox = css`
  border: 1px solid var(--main-color);
  display: inline-block;
  cursor: pointer;
  height: 3rem;
  min-width: 3rem;
  padding: 0.5rem;
`;

const currentStyle = css`
  color: var(--gray-color);
  .${item__checkbox} {
    cursor: not-allowed;
  }
  .${item__icon} {
    cursor: not-allowed;
  }
`;

export default UserList;
