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
      <h5 className={Style.repoHeader}>Latest Repositories created by this user</h5>
      <ul className={Style.repoList}>
        {repositories.edges.map(({node}) => {
          console.log('node:', node);
          return (
            <li key={node.id} className={Style.repoProfile}>
              <span className={Style.repoName}>{node.name}</span><br />
              <span className={Style.repoCreatedAt}>{node.createdAt}</span><br />
              {node.languages.nodes && node.languages.nodes.map(lang => {
                return <span key={lang.name} className={`badge badge-info ${Style.repoLanguage}`}>{lang.name}</span>;
              })}
            </li>
          );
        }
        )}
      </ul>
    </div>
  );
};

export default RepositoryList;
