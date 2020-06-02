/* eslint-disable no-console */
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {MockedProvider} from '@apollo/react-testing';
import gql from 'graphql-tag';

import FetchUsers from '../index';
import {waitFor} from '@testing-library/react';

describe('Fetch Users Component', () => {

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
  const mockProfiles = {
    search: {
      nodes: [{
        avatarUrl: 'https://avatars2.githubusercontent.com/u/20256970?u=6420f0aa27a29caec0c6ca6aa13af64803923652&v=4',
        bio: 'Its been a while since vanilla was the only flavour...',
        createdAt: '2016-07-02T14:23:00Z',
        id: 'MDQ6VXNlcjIwMjU2OTcw',
        login: 'luisangulouk',
        name: 'Luis Miguel Angulo',
        repositories: {
          totalCount: 25,
          __typename: 'RepositoryConnection'
        },
        url: 'https://github.com/luisangulouk',
        __typename: 'User'
      }],
      pageInfo: {
        endCursor: 'Y3Vyc29yOjk=',
        hasNextPage: false,
        __typename: 'PageInfo'
      },
      __typename: 'SearchResultItemConnection'
    }
  };

  const mocks = [
    {
      request: {
        query: SEARCH_BY_USER,
        variables: {
          user: 'Luis Angulo'
        }
      },
      result: {
        data: mockProfiles
      }
    }
  ];

  it('should render loading state while wait for data', () => {

    const wrapper = renderer.create(
      <MockedProvider mocks={mocks} addTypename={true}>
        <FetchUsers user={'Luis Angulo'} />
      </MockedProvider>,
    );

    const tree = wrapper.toJSON();
    expect(tree.props).toEqual({className: 'loadingWrapper'});
  });

  it('should render a list with users found', async () => {
    let wrapper;
    await act(async () => {
      wrapper = renderer.create(
        <MockedProvider mocks={mocks} addTypename={true}>
          <FetchUsers user={'Luis Angulo'} />
        </MockedProvider>,
      );
    });

    const tree = wrapper.toJSON();
    await waitFor(() => expect(tree.props.className).toEqual('row'));
  });

});
