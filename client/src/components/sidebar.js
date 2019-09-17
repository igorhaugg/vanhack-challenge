import React, { Component, Fragment } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    const { admin } = this.props.auth.user;
    return (
      <aside className={sidebar}>
        <div>
          <NavLink to='/dashboard' exact activeClassName={sidebar__active} className={sidebar__item}>
            <i className={`fas fa-home ${sidebar__icon}`} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to='/dashboard/tasks' activeClassName={sidebar__active} className={sidebar__item}>
            <i className={`fas fa-project-diagram ${sidebar__icon}`} />
            <span>All Tasks</span>
          </NavLink>
          {admin && (
            <Fragment>
              <NavLink to='/dashboard/task' activeClassName={sidebar__active} className={sidebar__item}>
                <i className={`fas fa-tasks ${sidebar__icon}`} />
                <span>Add Task</span>
              </NavLink>
              <NavLink to='/dashboard/users' activeClassName={sidebar__active} className={sidebar__item}>
                <i className={`fas fa-user ${sidebar__icon}`} />
                <span>Users</span>
              </NavLink>
            </Fragment>
          )}
        </div>
      </aside>
    );
  }
}

const sidebar = css`
  background-color: #0e1a25;
  border-right: 1px solid #eaeaea;
  display: none;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  padding-top: 10px;
  width: 250px !important;
  @media (min-width: 650px) {
    display: flex;
  }
`;
const sidebar__active = css`
  background: rgba(255, 255, 255, 0.23);
`;

const sidebar__icon = css`
  height: 1.5rem;
  margin-right: 1rem;
`;

const sidebar__item = css`
  color: #f5f5f5;
  cursor: pointer;
  display: block;
  font-size: 15px;
  padding: 12px 25px;
  text-decoration: none;
  transition: background-color 200ms linear;
  &:hover {
    background-color: #333;
  }
`;
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
