import "./index.js";
import github from "./db.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";
import RepoInfo from "./RepoInfo.js";
function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("React");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((res) => res.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repsitoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>
      </h1>
      <p> Hello {userName}</p>
      <p>
        <b>Search for:</b> {queryString} | <b>Search for:</b> {pageCount} |
        <b>Search for:</b> {totalCount}
      </p>
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
