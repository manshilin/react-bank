// front/src/component/button/index.js
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Button = ({ text, onClick, type, className }) => {
  const typeClass = type === 'primary' ? 'button--primary' :
                    type === 'transparent' ? 'button--transparent' :
                    type === 'red' ? 'button--red' : '';

  const classes = `button ${typeClass} ${className || ''}`.trim();

  // Використовуємо onClick для обробки подій замість вбудованого type="submit"
  return (
    <div className={classes} onClick={onClick}>
      {text}
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'transparent', 'red']),
  className: PropTypes.string
};

export default Button;

