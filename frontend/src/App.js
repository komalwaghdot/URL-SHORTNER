import React from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>URL Shortener</h1>
      <UrlForm />
      <hr />
      <UrlList /> {/* Admin Page */}
    </div>
  );
}

export default App;
