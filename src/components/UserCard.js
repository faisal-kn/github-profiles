import "../App.css";
import { getRepos } from "../apicalls/Api";
import { useEffect, useState } from "react";
import ErrorCard from "./ErrorCard";

const UserCard = ({ user }) => {
  console.log(user);
  const userID = user.name || user.login;
  const userBio = user.bio ? `${user.bio}` : "";
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let repoData = [];
    (async () => {
      repoData = await getRepos(user.login);
      if (repoData.status === "error") {
        setError(true);
        setErrorMsg(repoData.err);
      }
      setRepos(repoData.slice(0, 5));
    })();
  }, [user]);

  return (
    <div class="card" id="user-card">
      <div className="user-info">
        <h2>{userID}</h2>
        <p>{userBio}</p>
        <ul>
          <li>
            <span id="follower-count">{user.followers}</span>{" "}
            <strong>Followers &nbsp;</strong>
          </li>
          <li>
            <span id="following-count">{user.following}</span>{" "}
            <strong>Following &nbsp;</strong>
          </li>
          <li>
            <span id="repo-count">{user.public_repos}</span>{" "}
            <strong>Repos</strong>
          </li>
        </ul>
        <div id="repo-container">
          {!error &&
            repos.map((repo, index) => (
              <a
                className="repo"
                href={repo.html_url}
                target="_blank"
                key={index}
                id={`repo-${index}`}
              >
                {repo.name}
              </a>
            ))}
        </div>
        {error && <ErrorCard message={errorMsg} />}
      </div>
    </div>
  );
};

export default UserCard;
