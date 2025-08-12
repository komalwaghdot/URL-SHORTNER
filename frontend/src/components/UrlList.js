import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UrlList() {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/urls`);
      setUrls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="container mt-5">
      {/* Green background title */}
      <div className="p-3 mb-4 text-white rounded" style={{ backgroundColor: "#28a745" }}>
        <h2 className="text-center mb-0">📎 URL Shortener Dashboard</h2>
      </div>

      {/* Table Card */}
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">All Shortened URLs</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Short URL</th>
                  <th scope="col">Original URL</th>
                  <th scope="col">Visit Count</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {urls.length > 0 ? (
                  urls.map((url) => (
                    <tr key={url._id}>
                      <td>
                        <a
                          href={`${process.env.REACT_APP_API_URL.replace("/api", "")}/${url.short_code}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary fw-bold"
                        >
                          {`${process.env.REACT_APP_API_URL.replace("/api", "")}/${url.short_code}`}
                        </a>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "300px" }}>
                        <a href={url.original_url} target="_blank" rel="noreferrer" className="text-decoration-none">
                          {url.original_url}
                        </a>
                      </td>
                      <td>
                        <span className="badge bg-success">{url.visit_count}</span>
                      </td>
                      <td>{new Date(url.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No URLs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
