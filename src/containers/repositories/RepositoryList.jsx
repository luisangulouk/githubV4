/* eslint-disable no-ternary */
import React from 'react';
import Moment from 'react-moment';
import Style from './repositories.scss';

import Branches from './Branches';

const RepositoryList = ({repositories, login}) => {
  return (
    <div className={Style.repoWrapper}>
      <h5 className={Style.repoHeader}>{repositories.nodes ? 'Latest Repositories created by this user' : 'Repositories found in this colletion are not Public'}</h5>
      <ul className={Style.repoList}>
        {repositories.nodes && repositories.nodes.map((node) => {
          return (
            <li key={node.id} className={Style.repoProfile}>
              <div className={Style.repoName}>{node.name}</div>
              <span className={Style.repoCreatedAt}><Moment>{node.createdAt}</Moment></span><br />
              {node.languages.nodes && node.languages.nodes.map(lang => {
                return <span key={lang.name} className={`badge badge-info ${Style.repoLanguage}`}>{lang.name}</span>;
              })}
              <h6 className={Style.repoBranches}>Branches:</h6>
              <Branches refs={node.refs} repo={node.name} login={login}/>
            </li>
          );
        }
        )}
      </ul>
    </div>
  );
};

export default RepositoryList;
