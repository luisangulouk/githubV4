/* eslint-disable no-ternary */
import React from 'react';
import Style from './style.scss';

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children
}) => (
  <div className={Style.FetchMore}>
    {loading ? (
      <div>loading...</div>
    ) : (
      hasNextPage && (
        <button
          className={`btn btn-primary ${Style.FetchMoreButton}`}
          onClick={() => fetchMore({variables, updateQuery})}
        >
          More {children}
        </button>
      )
    )}
  </div>
);

export default FetchMore;
