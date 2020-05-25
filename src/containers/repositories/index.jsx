/* eslint-disable no-console */
import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import UserList from './RepositoryList';

const SEARCH_BY_USER = gql`
query($login: String!, $cursor: String) {
  user(login: $login) {
    topRepositories(first: 10, orderBy: {field: NAME, direction: DESC}, after: $cursor) {
      edges {
        node {
          id
          name
          createdAt
          languages(last: 5) {
            nodes {
              name
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

const FetchReposActivity = ({login}) => {
  console.log(login);
  return (
    <Query
      query={SEARCH_BY_USER}
      variables={{
        login
      }}
      skip={login === ''}
      notifyOnNetworkStatusChange={true}
    >
      {({data, loading, error, fetchMore}) => {

        if (loading && !data) {
          return <div>loading</div>;
        }
        console.log(data);
        const {user} = data;
        if (error) {
          return <div>{error}</div>;
        }

        return (
          <div className="row">
            <UserList
              loading={loading}
              repositories={user.topRepositories}
              fetchMore={fetchMore}
              entry={'user'}
            />
          </div>

        );
      }}
    </Query>
  );
};

export default FetchReposActivity;
