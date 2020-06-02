/* eslint-disable no-console */
import React from 'react';
import renderer, {act, create} from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import gql from 'graphql-tag';

import FetchCommits from '../Commits';
import {waitFor} from '@testing-library/react';

describe('Fetch Users Component', () => {

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

  const mockCommits = {
    repository: {
      ref: {
        target: {
          history: {
            edges: [{
              node: {
                messageHeadline: '[GHV4] test: Add new version of Jest and test repositories',
                oid: '894a4c6cc8a2eb83fdffb7f8c5cab802c783da12',
                __typename: 'Commit'
              },
              __typename: 'CommitEdge'
            }],
            length: 10,
            pageInfo: {
              hasNextPage: true,
              endCursor: '894a4c6cc8a2eb83fdffb7f8c5cab802c783da12 9',
              __typename: 'PageInfo'
            },
            __typename: 'CommitHistoryConnection'
          },
          __typename: 'Commit'
        },
        __typename: 'Ref'
      },
      __typename: 'Repository'
    }
  };

  const mocks = [
    {
      request: {
        query: SEARCH_COMMITS,
        variables: {
          login: 'luisangulouk',
          repo: 'githubV4',
          branch: 'develop'
        }
      },
      result: {
        data: mockCommits
      }
    }
  ];

  it('should render a button while wait for data', () => {

    const wrapper = renderer.create(
      <MockedProvider mocks={mocks} addTypename={true}>
        <FetchCommits login="luisangulouk" repo="githubV4" branch="develop" />
      </MockedProvider>,
    );

    const instance = wrapper.root;
    expect(instance.findAllByType('button').length).toEqual(1);
  });

  it('should render a list with commits found onClick event', async () => {

    let wrapper;
    await act(async () => {
      wrapper = create(
        <MockedProvider mocks={mocks} addTypename={true}>
          <FetchCommits login="luisangulouk" repo="githubV4" branch="develop" />
        </MockedProvider>,
      );
    });

    const root = wrapper.root;
    await act(async () => {
      const button = root.findAllByType('button')[0];
      button.props.onClick();
    });

    await waitFor(() => {
      const tree = wrapper.toJSON();
      expect(tree.children[1].props.className).toEqual('commitList');
    });

  });

});
