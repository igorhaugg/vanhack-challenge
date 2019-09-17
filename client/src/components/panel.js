import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const Panel = ({ tasks, assigned = '' }) => (
  <div className={panel}>
    {assigned && <span>{assigned}</span>}
    {tasks[0] ? (
      <table className={panel__table}>
        <thead>
          <tr>
            <td width='10%'>
              <b>Priority</b>
            </td>
            <td width='25%'>
              <b>Title</b>
            </td>
            <td width='35%'>
              <b>Description</b>
            </td>
            <td width='20%'>
              <b>User</b>
            </td>
            <td width='20%'>
              <b>Action</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td className={priority}>
                <i className={`fas fa-exclamation-circle ${task.priority === 3 ? priority__high : task.priority === 2 ? priority__normal : priority__low}`} />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.users && task.users.name}</td>
              <td>
                <Link to={`/dashboard/task/${task._id}`}>
                  <i className='fas fa-search' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div>{tasks.notasks}</div>
    )}
  </div>
);

const panel = css`
  border-radius: 5px;
  border: 1px solid #eaeaea;
  border-top: 3px solid #4a4aff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  margin-top: 25px;
  min-height: 100px;
  padding: 20px 25px;
  overflow: auto;
  text-align: left;
  & > span {
    color: #969696;
    font-weight: bold;
  }
`;

const panel__table = css`
  border-top: 1px solid #333;
  margin-top: 2rem;
  width: 100%;
  & tr:nth-child(even) {
    background-color: #f4f4f4;
  }
`;
const priority = css`
  text-align: center;
`;

const priority__high = css`
  color: red;
`;

const priority__normal = css`
  color: blue;
`;

const priority__low = css`
  color: green;
`;

export default Panel;
