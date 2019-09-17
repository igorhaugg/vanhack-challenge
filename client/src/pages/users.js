import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import { css } from 'emotion';
import { connect } from 'react-redux';

import Layout from '../components/layout';
import UserList from '../components/list-users';

import { getUsers, removeUser, editUser } from '../actions/authActions';

class ListUsers extends Component {
  state = {
    showAlert: false,
    user: {}
  };
  async componentDidMount() {
    await this.props.getUsers();
    document.title = 'Dashboard - Users';
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2);
  }
  handleDelete = user => {
    this.setState({ user, showAlert: true });
  };
  handleEdit = (user, item) => {
    const userEdited = user;
    switch (item) {
      case 'active':
        userEdited.active = !userEdited.active;
        userEdited.admin = userEdited.admin;
        break;
      case 'admin':
        userEdited.active = userEdited.active;
        userEdited.admin = !userEdited.admin;
        break;
      default:
        break;
    }
    this.props.editUser(userEdited._id, userEdited);
  };
  render() {
    const { users, currentUser, removeUser } = this.props;
    const { showAlert, user } = this.state;
    return (
      <Layout>
        <h2>List Users</h2>
        <div className={user__table}>
          {users && (
            <UserList
              users={users}
              currentUser={currentUser}
              removeUser={user => this.handleDelete(user)}
              editUser={(user, item) => this.handleEdit(user, item)}
            />
          )}
        </div>
        <SweetAlert
          show={showAlert}
          title='Warning'
          text='Are you sure you want to remove this user?'
          showCancelButton
          onConfirm={() => {
            removeUser(user._id);
            this.setState({ showAlert: false });
          }}
          onCancel={() => {
            this.setState({ showAlert: false });
          }}
          onClose={() => {
            this.setState({ showAlert: false });
          }}
        />
      </Layout>
    );
  }
}

const user__table = css`
  border-radius: 5px;
  border-top: 3px solid #4a4aff;
  box-shadow: 0px 3px 0.5rem rgba(0, 0, 0, 0.1);
  margin: 2rem auto 0;
  overflow: auto;
  width: 100%;
`;

const mapStateToProps = state => {
  const { users } = state.auth;
  const { user } = state.auth;
  return {
    users: users,
    currentUser: user.id
  };
};

export default connect(
  mapStateToProps,
  { getUsers, removeUser, editUser }
)(ListUsers);
