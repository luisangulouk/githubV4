/* eslint-disable no-console */
import React from 'react';
import Style from './repositories.scss';

const Branches = ({
  refs
}) => {
  return (
    <ul className={Style.repoList}>
      {refs.nodes.map((node) => {
        console.log(node);
        return (
          <li key={node.id} className={Style.branchProfile}>
            <span className={Style.branchName}>{node.name}</span>
          </li>
        );
      }
      )}
    </ul>
  );
};

export default Branches;
