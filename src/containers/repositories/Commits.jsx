/* eslint-disable no-ternary */
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import CommitList from './CommitList';
import Loading from '../loading';
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
  const handleClick = () => {
    setShowCommits(!showCommits);
  };

  return (
    <div>
      <button
        type="button"
        className={`btn btn-link ${Style.branchNameLink}`}
        onClick={handleClick}
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
            return <Loading />;
          }
          const {repository} = data;
          if (error) {
            return <div>{error}</div>;
          }

          return (
            <div className="commitList">
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
