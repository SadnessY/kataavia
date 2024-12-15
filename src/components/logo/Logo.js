import React from 'react';

import LogoIcon from '../../assets/img/main-logo.png';

import classes from './Logo.module.scss';

function Logo() {
  return (
    <div className={classes.logo}>
      <img src={LogoIcon} alt="logo" />
    </div>
  );
}

export default Logo;
