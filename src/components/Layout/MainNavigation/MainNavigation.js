import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function MainNavigator() {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${classes.nav}`}
    >
      <div className="container-fluid">
        <Link className={`navbar-brand ${classes.logo}`} to="/">
          {/* <img
            src="/docs/5.0/assets/brand/bootstrap-logo.svg"
            alt=""
            width="30"
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
                  className={`nav-link ${classes.navLink} ${classes.active}`}
                  aria-current="page"
                >
                  Find Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${classes.navLink}`}
                  aria-current="page"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <img
            src="/public/static/default.png"
            className={classes.profileImage}
            alt=""
          />
          <button className={`btn ${classes.logout}`}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
