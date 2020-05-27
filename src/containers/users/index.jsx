import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import UserList from './UserList';
import Loading from '../loading';

const SEARCH_BY_USER = gql`
query($user: String!, $cursor: String) {
  search(query: $user, type: USER, first: 10, after: $cursor) {
    nodes {
      __typename
      ... on User {
        id
        createdAt
        name
        login
        avatarUrl
        url
        bio
        repositories {
          totalCount
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

const FetchUsers = ({user}) => {
  return (
    <Query
      query={SEARCH_BY_USER}
      variables={{
        user
      }}
      skip={user === ''}
      notifyOnNetworkStatusChange={true}
    >
      {({data, loading, error, fetchMore}) => {

        if (loading && !data) {
          return <Loading />;
        }
        const {search} = data;
        if (error) {
          return <div>{error}</div>;
        }

        return (
          <div className="row">
            <UserList
              loading={loading}
              profiles={search}
              fetchMore={fetchMore}
              entry={'search'}
            />
          </div>

        );
      }}
    </Query>
  );
};

export default FetchUsers;
