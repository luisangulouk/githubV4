/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';

import UserProfile from '../UserProfile';

describe('User List Component', () => {
  const mockProfiles = {
    nodes: [{
      avatarUrl: 'https://avatars2.githubusercontent.com/u/20256970?u=6420f0aa27a29caec0c6ca6aa13af64803923652&v=4',
      bio: 'Its been a while since vanilla was the only flavour...',
      createdAt: '2016-07-02T14:23:00Z',
      id: 'MDQ6VXNlcjIwMjU2OTcw',
      login: 'luisangulouk',
      name: 'Luis Miguel Angulo',
      repositories: {
        totalCount: 25,
        __typename: 'RepositoryConnection'
      },
      url: 'https://github.com/luisangulouk'
    }],
    pageInfo: {
      endCursor: 'Y3Vyc29yOjk=',
      hasNextPage: false
    }
  };

  it('should match snapshot', () => {

    const node = mockProfiles.nodes[0];
    const component = renderer.create(<UserProfile {...node} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
