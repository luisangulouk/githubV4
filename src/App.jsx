import React from 'react';
import HeroHeader from './containers/HeroHeader';
import Search from './containers/users/Search';
import Style from './App.scss';

const App = () => {

  return (
    <div className={Style.appWrapper}>
      <div>
        <HeroHeader />
        <Search />
      </div>
    </div>
  );
};

export default App;
