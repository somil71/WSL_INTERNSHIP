import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
