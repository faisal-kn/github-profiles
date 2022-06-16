import { useState } from "react";
import "./App.css";
import { getUser } from "./apicalls/Api";
import UserCard from "./components/UserCard";
import ErrorCard from "./components/ErrorCard";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function formUploadHandler(e) {
    e.preventDefault();
    const fetchData = await getUser(userName);
    if (fetchData.status === "error") {
      setError(true);
      setErrorMsg(fetchData.err);
    } else {
      setError(false);
      setUserName(fetchData.login);
      setUser(fetchData);
    }
  }

  return (
    <>
      <form className="user-form" id="form" onSubmit={formUploadHandler}>
        <input
          type="text"
          id="search"
          placeholder="Search a Github User"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      {!error && user && <UserCard user={user} />}
      {error && <ErrorCard message={errorMsg} />}
    </>
  );
}

export default App;
