import "./index.js";
import github from "./db.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from "./RepoInfo.js";
function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        setUserName(viewer.name);
        setRepoList(repos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>
        Hello {userName}
      </h1>
      <ul>
        {repoList && (
          <ul className="list-group list-group-flush">
            {repoList.map((repo) => (
              <RepoInfo key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}

export default App;
