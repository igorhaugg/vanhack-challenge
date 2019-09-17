import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../common/AuthForm';
import InputItem from '../common/InputItem';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

import { loginUser } from '../actions/authActions';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    passwordType: 'password',
    passwordClicked: false,
    show: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({ show: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = () => {
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password',
      passwordClicked: !this.state.passwordClicked
    });
  };

  render() {
    const { error = {} } = this.props;
    const divStyle = {
      display: 'flex'
    };
    return (
      <AuthForm titleText='Login' messageText='Doesn&#39;t have an account?'>
        <form onSubmit={this.onSubmit}>
          <InputItem label='email' name='email' type='email' value={this.state.email} onChange={this.onChange} error={error.email} required={true} />
          <InputItem
            label='password'
            name='password'
            type={this.state.passwordType}
            value={this.state.password}
            onChange={this.onChange}
            handleToggle={this.handleToggle}
            passwordClicked={this.state.passwordClicked}
            error={error.password}
            required={true}
          />
          {this.state.show && Object.keys(error).length === 0 && <Spinner />}
          <div style={divStyle}>
            <Button type='submit' text='Continue' desc='auth' />
          </div>
        </form>
      </AuthForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
