import React from 'react';
import renderer from 'react-test-renderer';

import Branches from '../Branches';

describe('Branches Component', () => {

  const mockRefs = {
    nodes: [{
      id: 'MDM6UmVmNjc1MjI1Nzc6cmVmcy9oZWFkcy9tYXN0ZXI=',
      name: 'master',
      __typename: 'Ref'
    }],
    __typename: 'RefConnection'
  };
  it('should match snapshot', () => {

    const component = renderer.create(<Branches refs={mockRefs} repo={'XamarinSQL'} login={'icebeam7'}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
