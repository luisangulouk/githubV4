/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React from 'react';
import Style from './repositories.scss';

const RepositoryList = ({
  repositories
}) => {
  console.log('repositories:', repositories);
  return (
    <div className={Style.repoWrapper}>
      <h5 className={Style.repoHeader}>Repositories</h5>
      <ul className={Style.repoList}>
        {repositories.edges.map(({node}) => {
          console.log('node:', node);
          return (
            <li key={node.id}>
              {node.name}
            </li>
          );
        }
        )}
      </ul>
    </div>
  );
};

export default RepositoryList;
