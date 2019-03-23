import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ text, type, desc, disabled, textStyle }) => {
  let buttonStyles = 'button button--';
  let spanStyles = 'text' + textStyle;
  return (
    <button
      className={buttonStyles + desc}
      type={type}
      disabled={disabled ? true : false}
    >
      <span className={spanStyles !== 'text' ? spanStyles : ''}>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  textStyle: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button',
  desc: 'default',
  disabled: false,
  textStyle: ''
};

export default Button;
