import React, { useState } from "react";
import axios from "axios";

export default function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/shorten`,
        { original_url: originalUrl }
      );
      setShortUrl(res.data.short_url);
      setOriginalUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-4 text-white py-3 rounded shadow"
        style={{ backgroundColor: "green" }}
      >
        🚀 URL Shortener
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="urlInput" className="form-label fw-bold">
            Enter Your Long URL
          </label>
          <input
            id="urlInput"
            type="url"
            placeholder="Paste your link here..."
            className="form-control form-control-lg"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success btn-lg px-4"
          >
            Shorten URL
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="alert alert-success mt-4 shadow-sm">
          <strong>Shortened URL:</strong>{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold text-decoration-none"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
