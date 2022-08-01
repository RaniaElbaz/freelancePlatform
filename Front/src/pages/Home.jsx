import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/login/Login";

function Home() {
  const logOut = () => {
    localStorage.clear("token");
  };

  return (
    <div className="h-100">
      <h1>In The name of Allah 💪</h1>
      <h1 style={{ color: "red", fontSize: "60px", textAlign: "center" }}>
        Home
      </h1>

      <Link to="/login" className="btn btn-warning my-4  moveDetailBtn">
        login
      </Link>
      <br />
      <Link to="/admin/login" className="btn btn-warning my-4  moveDetailBtn">
        Admin login
      </Link>
      <br />
      <Link to="/register" className="btn btn-warning my-4  moveDetailBtn">
        SignUP
      </Link>
      <br />
      <Link
        to="/admin/register"
        className="btn btn-warning my-4  moveDetailBtn"
      >
        Admin SignUP
      </Link>
      <br />
      <Link
        to="/login"
        className="btn btn-warning my-4  moveDetailBtn"
        onClick={logOut}
      >
        Logout
      </Link>
    </div>
  );
}

export default Home;

// rfce
