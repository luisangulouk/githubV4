import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import HeroHeader from './containers/HeroHeader';
import Search from './containers/users/Search';

describe('App functional component', () => {

  it('should render Header and Search components', () => {
    const app = renderer.create(<App/>);
    const instance = app.root;

    expect(instance.findAllByType(HeroHeader)).toBeDefined();
    expect(instance.findAllByType(Search)).toBeDefined();
  });

});
