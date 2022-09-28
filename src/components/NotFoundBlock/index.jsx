import React from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>К сожалению пусто</h1>
      <p>К сожалению на странице не чего не найдено.</p>
    </div>
  );
};

export default NotFoundBlock;