/* eslint-disable no-ternary */
import React, {useState} from 'react';
import Moment from 'react-moment';
import FetchReposActivity from '../repositories';
import Style from './users.scss';

const UserProfile = ({name, createdAt, login, avatarUrl, url, bio, repositories}) => {
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
          <div className={Style.cardCreatedAt}>
            Github user since: <Moment format="YYYY">{createdAt}</Moment>
          </div>
          {bio && <p className={Style.cardBio}>{bio}</p>}
          <a href={url} className={Style.cardGithubLink}>{login}</a><br />
          <span className={Style.cardRepos} title="Repositories found">{repositories.totalCount}</span><br />
          {repositories.totalCount > 0 && <div className={Style.cardActivity}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setActivity(!activity)}
            >{ activity ? 'Hide' : 'Show' } Activity</button>
          </div>
          }
          {activity && <FetchReposActivity login={login}/>}
        </div>
      </div>
    </article>
  );
};

export default UserProfile;
