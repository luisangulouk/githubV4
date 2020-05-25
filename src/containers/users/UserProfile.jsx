/* eslint-disable no-console */
import React, {useState} from 'react';
import FetchReposActivity from '../repositories';
import Style from './users.scss';

const UserProfile = ({name, login, avatarUrl, url, bio, repositories}) => {
  const [activity, setActivity] = useState(false);
  return (
    <article className={`row ${Style.cardWrapper}`}>
      <div className="col-sm-3">
        <div className={Style.cardGithubProfile}>
          <img className={Style.cardImg} src={avatarUrl} alt={name} />
        </div>
      </div>
      <div className="col-sm-9">
        <div className={Style.cardGithubProfile}>
          <h5 className={Style.cardDevName}>{name}</h5>
          <a href={url} className={Style.cardGithubLink}>{login}</a>
          <p className={Style.cardRepos}>Repos: {repositories.totalCount}</p>
          <p className={Style.cardBio}>{bio}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setActivity(true)}
          >Show Activity</button>
          {activity && <FetchReposActivity login={login}/>}
        </div>
      </div>
    </article>
  );
};

export default UserProfile;
