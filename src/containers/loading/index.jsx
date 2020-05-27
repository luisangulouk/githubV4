/* eslint-disable no-console */
import React from 'react';
import Style from './loading.scss';

const Loading = () => {
  return (
    <div className={Style.loadingWrapper}>
      <span className={Style.loadingMessage}>
        loading...
      </span>
    </div>
  );
};

export default Loading;
