import React from "react";

const RepoInfo = ({ repo }) => {
  let license;

  switch (repo.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span
          style={{ fontSize: ".6em" }}
          className="px-1 py-0 ms-1 d-inlineblock btn btn-sm btn-danger"
        >
          NO LICENSE
        </span>
      );
      break;
    case "NOASSERTION":
      license = (
        <span
          style={{ fontSize: ".6em" }}
          className="px-1 py-0 ms-1 d-inlineblock btn btn-sm btn-warning"
        >
          {repo.licenseInfo.spdxId}
        </span>
      );
      break;
    default:
      license = (
        <span
          style={{ fontSize: ".6em" }}
          className="px-1 py-0 ms-1 d-inlineblock btn btn-sm btn-success"
        >
          {repo.licenseInfo.spdxId}
        </span>
      );
  }

  return (
    <li className="list-group-item" key={repo.id.toString()}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a className="h5 mb-0 text-decoration-none" href={repo.url}>
            {repo.name}
          </a>
          <p className="small">{repo.description}</p>
        </div>
        <div className="text-nowrap ms-3">
          {repo.licenseInfo?.spdxId}
          <span
            style={{ fontSize: ".6em" }}
            className={
              "px-1 py-0 ms-1 d-inlineblock btn btn-sm " +
              (repo.viewerSubscription === "SUBSCRIBED"
                ? "btn-success"
                : "btn-outline-secondary")
            }
          >
            {repo.viewerSubscription}
          </span>
          <span>{license}</span>
        </div>
      </div>
    </li>
  );
};

export default RepoInfo;
