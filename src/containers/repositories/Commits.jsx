/* eslint-disable no-console */
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import CommitList from './CommitList';
import Style from './repositories.scss';

const SEARCH_COMMITS = gql`
query ($login: String!, $repo: String!, $branch: String!) {
  repository(owner: $login, name: $repo) {
    ref(qualifiedName: $branch) {
      target {
        ... on Commit {
          history(first: 10) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                oid
                messageHeadline
              }
            }
          }
        }
      }
    }
  }
}
`;

const FetchCommits = ({login, repo, branch}) => {
  const [showCommits, setShowCommits] = useState(false);
  return (
    <div>
      <button
        type="button"
        className={`btn btn-link ${Style.branchNameLink}`}
        onClick={() => setShowCommits(true)}
      >{branch}</button>
      {showCommits && <Query
        query={SEARCH_COMMITS}
        variables={{
          login,
          repo,
          branch
        }}
        skip={login === '' || repo === '' || branch === ''}
        notifyOnNetworkStatusChange={true}
      >
        {({data, loading, error}) => {

          if (loading && !data) {
            return <div>loading</div>;
          }
          const {repository} = data;
          console.log(data);
          if (error) {
            return <div>{error}</div>;
          }

          return (
            <div>
              <CommitList
                history={repository.ref.target.history}
              />
            </div>
          );
        }}
      </Query>}
    </div>
  );
};

export default FetchCommits;
