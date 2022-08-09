import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import classes from "./MainNavigation.module.css";

export default function MainNavigator() {
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
          {localStorage.getItem("token") ? (
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
                <ul className="dropdown-menu  text-small shadow">
                  <li>
                    <a className="dropdown-item" href="s">
                      profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="s">
                      logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className={`btn ${classes.signIn}`}>log in</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
