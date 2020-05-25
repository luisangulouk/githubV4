/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React from 'react';

import FetchMore from '../FetchMore';
import Style from './repositories.scss';

const getNewState = entry => (
  previousResult,
  {fetchMoreResult},
) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    [entry]: {
      nodes: [
        ...previousResult[entry].nodes,
        ...fetchMoreResult[entry].nodes
      ],
      pageInfo: fetchMoreResult[entry].pageInfo,
      __typename: previousResult[entry].__typename
    }
  };
};

const RepositoryList = ({
  repositories,
  loading,
  fetchMore,
  entry
}) => {
  console.log('repositories:', repositories);
  return (
    <div className="container">
      {repositories.edges.map(({node}) => {
        console.log('node:', node);
        return (
          <div key={node.id}>
            {node.name}
          </div>
        );
      }
      )}
    </div>
  );
};

export default RepositoryList;
