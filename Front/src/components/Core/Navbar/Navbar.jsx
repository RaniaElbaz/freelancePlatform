import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const logOut = () => {
    localStorage.clear("token");
  };

  return (
    <div>
      <Link to="/login" className="btn btn-warning my-4  moveDetailBtn">
        login
      </Link>

      <Link to="/admin/login" className="btn btn-warning my-4  moveDetailBtn">
        Admin login
      </Link>

      <Link to="/register" className="btn btn-warning my-4  moveDetailBtn">
        SignUP
      </Link>

      <Link
        to="/admin/register"
        className="btn btn-warning my-4  moveDetailBtn"
      >
        Admin SignUP
      </Link>

      <Link
        to="/login"
        className="btn btn-warning my-4  moveDetailBtn"
        onClick={logOut}
      >
        Logout
      </Link>
      
      <Link
        to="/change-password"
        className="btn btn-warning my-4  moveDetailBtn"
      >
        change Password
      </Link>
    </div>
  );
}

export default Navbar;
