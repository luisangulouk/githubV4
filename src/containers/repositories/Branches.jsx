import React from 'react';
import Style from './repositories.scss';
import FetchCommits from './Commits';

const Branches = ({refs, login, repo}) => {
  return (
    <ul className={Style.repoList}>
      {refs.nodes.map((node) => {
        return (
          <li key={node.id} className={Style.branchProfile}>
            <FetchCommits login={login} repo={repo} branch={node.name}/>
          </li>
        );
      }
      )}
    </ul>
  );
};

export default Branches;
