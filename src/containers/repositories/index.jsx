/* eslint-disable no-console */
import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import RepositoryList from './RepositoryList';

const SEARCH_BY_USER = gql`
query($login: String!) {
  user(login: $login) {
    repositories(last: 5) {
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
      {({data, loading, error}) => {

        if (loading && !data) {
          return <div>loading</div>;
        }
        console.log(data);
        const {user} = data;
        if (error) {
          return <div>{error}</div>;
        }

        return (
          <div>
            <RepositoryList
              loading={loading}
              repositories={user.repositories}
            />
          </div>

        );
      }}
    </Query>
  );
};

export default FetchReposActivity;
