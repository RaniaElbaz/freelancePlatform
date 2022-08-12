import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

export default function MainNavigator() {
  const history = useHistory();
  const [team, setTeam] = useState(false);

  const logoutHandler = (e) => {
    history.push("/");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      const teamApi = axios({
        url: `http://localhost:8080/team/member`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      teamApi
        .then((res) => {
          console.log(res);
          setTeam(res.data._id);
        })
        .catch((error) => {
          console.log(error.code, error.message, error.response.data);
        });
    }
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${classes.nav}`}
    >
      <div className="container-fluid">
        <Link className={`navbar-item ${classes.logo}`} to="/">
          {/* <img
            src="./static/logo.png"
            alt=""
            width="200"
            height="24"
            className="d-inline-block align-text-top"
          /> */}
          Devolanco
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className={`nav-item `}>
                <Link
                  to="/project"
                  className={`nav-link ${classes.navLink} ${classes.active} mx-3`}
                  aria-current="page"
                >
                  Find Projects
                </Link>
              </li>
              <li className={`nav-item me-3`}>
                <Link
                  to="/store"
                  className={`nav-link ${classes.navLink}`}
                  aria-current="page"
                >
                  Store
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link
                  to="/education"
                  className={`nav-link ${classes.navLink}`}
                  aria-current="page"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          {console.log("token", token)}
          {token ? (
            <>
              <Link to="/profile">
                <div className="d-flex ">
                  <img
                    src={
                      localStorage.getItem("image")
                        ? localStorage.getItem("image")
                        : "/static/default.jpg"
                    }
                    className={classes.profileImage}
                    alt=""
                  />
                  <h6 className={`my-auto ps-2 ${classes.username}`}>
                    {localStorage.getItem("username")}
                  </h6>
                </div>
              </Link>
              <div
                className={`d-inline-block dropdown ${classes.dropdown}`}
                data-bs-toggle="dropdown"
              >
                <RiArrowDropDownLine />
                <ul className="dropdown-menu  text-small shadow dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => history.push("/profile")}
                    >
                      profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => history.push("/changePassword")}
                    >
                      change password
                    </button>
                  </li>
                  {team && role === "freelancer" && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => history.push(`/team/${team}`)}
                      >
                        switch to team account
                      </button>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logoutHandler}>
                      logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className={`btn ${classes.signIn} me-2 `}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  log in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`btn ${classes.signIn} `}
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
