import React from 'react';
import renderer from 'react-test-renderer';

import CommitList from '../CommitList';

describe('Commit List Component', () => {

  const mockHistory = {
    edges: [{
      node: {
        oid: 'fd91ff7157613b03eb33388761f5f3a769d4091c',
        messageHeadline: '[GHV4] refactor: Add handleClick function on commits, add test',
        __typename: 'Commit'
      },
      __typename: 'CommitEdge'
    }
    ],
    pageInfo: {
      hasNextPage: true,
      endCursor: 'fd91ff7157613b03eb33388761f5f3a769d4091c 9',
      __typename: 'PageInfo'
    },
    __typename: 'CommitHistoryConnection'
  };

  it('should match snapshot', () => {

    const component = renderer.create(<CommitList history={mockHistory} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
