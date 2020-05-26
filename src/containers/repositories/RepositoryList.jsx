/* eslint-disable no-console */
import React from 'react';
import Moment from 'react-moment';
import Style from './repositories.scss';

import Branches from './Branches';

const RepositoryList = ({
  repositories
}) => {
  console.log(repositories);
  return (
    <div className={Style.repoWrapper}>
      <h5 className={Style.repoHeader}>Latest Repositories created by this user</h5>
      <ul className={Style.repoList}>
        {repositories.nodes && repositories.nodes.map((node) => {
          console.log(node);
          return (
            <li key={node.id} className={Style.repoProfile}>
              <span className={Style.repoName}>{node.name}</span><br />
              <span className={Style.repoCreatedAt}><Moment>{node.createdAt}</Moment></span><br />
              {node.languages.nodes && node.languages.nodes.map(lang => {
                return <span key={lang.name} className={`badge badge-info ${Style.repoLanguage}`}>{lang.name}</span>;
              })}
              <h6 className={Style.repoBranches}>Branches:</h6>
              <Branches refs={node.refs}/>
            </li>
          );
        }
        )}
      </ul>
    </div>
  );
};

export default RepositoryList;
