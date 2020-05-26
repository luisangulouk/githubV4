/* eslint-disable no-console */
import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import RepositoryList from './RepositoryList';

const SEARCH_BY_REPO = gql`
query($login: String!) {
  search(query: $login, type: REPOSITORY, last: 10) {
    nodes {
      ... on Repository {
        id
        createdAt
        name
        languages(last: 5) {
          nodes {
            name
          }
        }
        nameWithOwner
        refs(last: 10, refPrefix: "refs/heads/") {
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
`;

const FetchReposActivity = ({login}) => {
  const orgLogin = `org:${login}`;
  console.log(orgLogin);
  return (
    <Query
      query={SEARCH_BY_REPO}
      variables={{
        login: orgLogin
      }}
      skip={login === ''}
      notifyOnNetworkStatusChange={true}
    >
      {({data, loading, error}) => {

        if (loading && !data) {
          return <div>loading</div>;
        }
        const {search} = data;
        if (error) {
          return <div>{error}</div>;
        }

        return (
          <div>
            <RepositoryList
              loading={loading}
              repositories={search}
            />
          </div>

        );
      }}
    </Query>
  );
};

export default FetchReposActivity;
