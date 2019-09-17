import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import AuthImage from './images/auth.jpg';
import AuthMobileImage from './images/auth_mobile.jpeg';

const AuthForm = ({ children, titleText, messageText }) => {
  let link = titleText === 'Login' ? '/register' : '/login';
  let linkText = titleText === 'Login' ? 'Register' : 'Login';
  return (
    <main className={auth}>
      <div className={auth__greeting}>
        <div className={auth__greeting__conteiner}>
          <h2> Van Hack Code Challenge </h2>
          <hr className={auth__greeting__line} />
          <p>This web application is a dashboard that allow admin users to manage tasks.</p>
        </div>
      </div>
      <div className={auth__form}>
        <h1 className={auth__title}>{titleText}</h1>
        {children}
        <p className={auth__message}>
          {messageText}
          <Link to={link} className={auth__link}>
            {linkText}
          </Link>
        </p>
      </div>
    </main>
  );
};

const auth = css`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  background: url(${AuthMobileImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 450px) {
    background: url(${AuthImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const auth__form = css`
  background-color: rgba(248, 248, 248, 0.5);
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 5rem 2rem;
  width: 38rem;
`;

const auth__title = css`
  color: #787878;
  font-size: 2.8rem;
  font-weight: lighter;
  margin-bottom: 4rem;
  text-align: center;
`;

const auth__message = css`
  margin-top: 2rem;
`;

const auth__link = css`
  border: 1px transparent solid;
  border-bottom-color: var(--gray-color);
  color: purple;
`;

const auth__greeting = css`
  display: none;

  @media (min-width: 800px) {
    color: #333;
    display: flex;
    align-items: center;
    height: 100vh;
    width: 50%;
  }
`;

const auth__greeting__conteiner = css`
  padding: 5rem;
`;

const auth__greeting__line = css`
  background-color: purple;
  border: none;
  color: purple;
  height: 0.5rem;
`;

AuthForm.propTypes = {
  titleText: PropTypes.string.isRequired
};

export default AuthForm;
