/* eslint-disable no-console */
import React from 'react';
import Style from './repositories.scss';

const CommitList = ({
  history
}) => {
  return (
    <ul className={Style.repoList}>
      {history.edges.map(({node}) => {
        console.log(node);
        return (
          <li key={node.oid} className={Style.branchCommitMessage}>
            <span>{node.messageHeadline}</span>
          </li>
        );
      }
      )}
    </ul>
  );
};

export default CommitList;
