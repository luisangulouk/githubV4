import React from 'react';
import Style from './HeroHeader.scss';

const HeroHeader = () => {

  return (
    <header className={`container-fluid ${Style.heroHeaderContainer}`}>
      <div className="row">
        <div><h1 className={Style.heroHeaderTitle}>Github GraphQL</h1></div>
      </div>
    </header>
  );

};

export default HeroHeader;

