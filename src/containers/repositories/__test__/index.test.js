/* eslint-disable no-console */
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import gql from 'graphql-tag';

import FetchReposActivity from '../index';
import {waitFor} from '@testing-library/react';

describe('Fetch Repositories Activity Component', () => {

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

  const mockRepositories = {
    search: {
      nodes: [{
        createdAt: '2016-09-06T15:46:44Z',
        id: 'MDEwOlJlcG9zaXRvcnk2NzUyMjU3Nw==',
        languages: {
          nodes: [{
            name: 'C#',
            __typename: 'Language'
          }],
          __typename: 'LanguageConnection'
        },
        name: 'XamarinSQL',
        nameWithOwner: 'icebeam7/XamarinSQL',
        refs: {
          nodes: [{
            id: 'MDM6UmVmNjc1MjI1Nzc6cmVmcy9oZWFkcy9tYXN0ZXI=',
            name: 'master',
            __typename: 'Ref'
          }],
          __typename: 'RefConnection'
        },
        __typename: 'Repository'
      }],
      __typename: 'SearchResultItemConnection'
    }
  };

  const mocks = [
    {
      request: {
        query: SEARCH_BY_REPO,
        variables: {
          login: 'org:luisangulouk'
        }
      },
      result: {
        data: mockRepositories
      }
    }
  ];

  it('should render loading state while wait for data', () => {

    const wrapper = renderer.create(
      <MockedProvider mocks={mocks} addTypename={true}>
        <FetchReposActivity login={'luisangulouk'} />
      </MockedProvider>,
    );

    const tree = wrapper.toJSON();
    expect(tree.props).toEqual({className: 'loadingWrapper'});
  });

  it('should render a list with repositories found', async () => {
    let wrapper;
    await act(async () => {
      wrapper = renderer.create(
        <MockedProvider mocks={mocks} addTypename={true}>
          <FetchReposActivity login={'luisangulouk'} />
        </MockedProvider>,
      );
    });

    const tree = wrapper.toJSON();
    await waitFor(() => expect(tree.props.className).toEqual('repositoryList'));
  });

});
