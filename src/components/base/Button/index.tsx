import { Button as UIButton } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { FC, Fragment, ReactElement, cloneElement, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import { ButtonProps } from './types';

const textColorOptions = {
  solid: {
    primary: 'white',
    secondary: 'white',
    transparent: 'black',
  },
  outline: {
    primary: 'primary',
    secondary: 'secondary',
    transparent: 'black',
  },
  ghost: {
    primary: 'primary',
    secondary: 'secondary',
    transparent: 'black',
  },
};

const bgColorOptions = {
  solid: {
    primary: 'primary',
    secondary: 'secondary',
    transparent: 'transparent',
  },
  outline: {
    primary: 'transparent',
    secondary: 'transparent',
    transparent: 'transparent',
  },
  ghost: {
    primary: 'transparent',
    secondary: 'transparent',
    transparent: 'transparent',
  },
};

const Button: FC<ButtonProps> = ({
  id,
  className,
  children,
  color = 'primary',
  disabled,
  external,
  leftAddon,
  onClick,
  onMouseOver,
  rightAddon,
  tabIndex,
  text,
  testid,
  to,
  type = 'submit',
  variant = 'solid',
}) => {
  const onClickFunc: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const childrenComponent: ReactElement = (
    <Fragment>
      {leftAddon &&
        cloneElement(leftAddon, {
          className: classNames('button-prefix', leftAddon.props.className),
        })}
      {text && <div className="button-text">{text}</div>}
      {children}
      {rightAddon &&
        cloneElement(rightAddon, {
          className: classNames('button-suffix', rightAddon.props.className),
        })}
    </Fragment>
  );

  const buttonClassName = classNames('custom-button', color, className, { disabled });

  if (to && external) {
    return (
      <a
        className={buttonClassName}
        data-testid={testid}
        href={to}
        id={id}
        onClick={onClickFunc}
        onFocus={onMouseOver}
        onMouseOver={onMouseOver}
        rel="noreferrer"
        tabIndex={tabIndex}
        target="_blank"
      >
        {childrenComponent}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        className={buttonClassName}
        data-testid={testid}
        id={id}
        onClick={onClickFunc}
        onFocus={onMouseOver}
        onMouseOver={onMouseOver}
        tabIndex={tabIndex}
        to={to}
      >
        {childrenComponent}
      </Link>
    );
  }

  return (
    <UIButton
      backgroundColor={bgColorOptions[variant][color]}
      borderColor={textColorOptions[variant][color]}
      className={buttonClassName}
      color={textColorOptions[variant][color]}
      data-testid={testid}
      disabled={disabled}
      id={id}
      onClick={onClickFunc}
      onFocus={onMouseOver}
      onMouseOver={onMouseOver}
      tabIndex={tabIndex}
      type={type}
      variant={variant}
    >
      {childrenComponent}
    </UIButton>
  );
};

export default Button;
