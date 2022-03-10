import React from "react";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";

export default function LandingPage() {
  return (
    <div className="body">
      <div className="title">
        <div>
          <h1>Welcome to the </h1>
        </div>
        <div>
          <h1>JUNGLE OF RECIPES</h1>
        </div>
      </div>
      <Link to="/home/">
        <button className="bot-navigation">Home</button>
      </Link>
    </div>
  );
}
