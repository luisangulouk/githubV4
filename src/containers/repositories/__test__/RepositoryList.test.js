import React from 'react';
import renderer from 'react-test-renderer';

import RepositoryList from '../RepositoryList';

describe('Repository List Component', () => {

  const mockRepositories = {
    search: {
      nodes: [{
        createdAt: '2016-09-06T15:46:44Z',
        id: 'MDEwOlJlcG9zaXRvcnk2NzUyMjU3Nw==',
        languages: {
          nodes: [{
            name: 'C#',
            __typename: 'Language'
          }],
          __typename: 'LanguageConnection'
        },
        name: 'XamarinSQL',
        nameWithOwner: 'icebeam7/XamarinSQL',
        refs: {
          nodes: [{
            id: 'MDM6UmVmNjc1MjI1Nzc6cmVmcy9oZWFkcy9tYXN0ZXI=',
            name: 'master',
            __typename: 'Ref'
          }],
          __typename: 'RefConnection'
        },
        __typename: 'Repository'
      }],
      __typename: 'SearchResultItemConnection'
    }
  };

  it('should match snapshot', () => {

    const component = renderer.create(<RepositoryList repositories={mockRepositories} login={'icebeam7'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
