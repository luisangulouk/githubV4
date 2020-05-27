import React from 'react';
import renderer from 'react-test-renderer';
import Search from './Search';

describe('Search Component', () => {
  const wrapper = renderer.create(<Search/>);
  const instance = wrapper.root;

  it('should create an input and a button on loading', () => {

    expect(instance).toBeDefined();
    expect(instance.findAllByType('input').length).toEqual(1);
    expect(instance.findAllByType('button').length).toEqual(1);
  });

});
