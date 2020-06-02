/* eslint-disable no-underscore-dangle */
import React from 'react';

import FetchMore from '../FetchMore';
import UserProfile from './UserProfile';
import Style from './users.scss';

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

const UserList = ({
  profiles,
  loading,
  fetchMore,
  entry
}) => {
  return (
    <div className="container">
      {profiles.nodes.length === 0 && <div className={Style.searchNotFound}>No matches found, try with a different name!</div>}
      {profiles.nodes.map(node => {
        return (
          <div key={node.id}>
            <UserProfile {...node} />
          </div>
        );
      }
      )}

      <FetchMore
        loading={loading}
        hasNextPage={profiles.pageInfo.hasNextPage}
        variables={{
          cursor: profiles.pageInfo.endCursor
        }}
        updateQuery={getNewState(entry)}
        fetchMore={fetchMore}
      >
      Profiles
      </FetchMore>
    </div>
  );
};

export default UserList;
