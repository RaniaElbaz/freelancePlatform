import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import classes from "./MainNavigation.module.css";
import UpdateDetails from "../../UpdateModals/UpdateDetails";

const staticRole = localStorage.getItem("role");
const staticId = localStorage.getItem("id");

export default function MainNavigator() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const [modalShow, setModalShow] = useState(false);

  const history = useHistory();
  const [team, setTeam] = useState(false);
  const [user, setUser] = useState({});

  const logoutHandler = (e) => {
    history.push("/login");
    window.location.reload();
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
          setTeam(undefined);
          console.log(error.code, error.message, error.response.data);
        });

      switch (role) {
        case "freelancer":
          axios({
            url: `http://localhost:8080/freelancers/public/${id}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setUser({
                name: `${res.data.firstName} ${res.data.lastName}`,
                image: res.data.image,
              });
            })
            .catch((error) => {
              console.log(error.code, error.message, error.response.data);
            });
          break;
        case "team":
          axios({
            url: `http://localhost:8080/team/${id}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setUser({ name: `${res.data.name}`, image: res.data.logo });
            })
            .catch((error) => {
              console.log(error.code, error.message, error.response.data);
            });
          break;
        case "client":
          axios({
            url: `http://localhost:8080/client/${id}`,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setUser({
                name: `${res.data.data.firstName} ${res.data.data.lastName}`,
                image: res.data.image,
              });
            })
            .catch((error) => {
              console.log(error.code, error.message, error.response.data);
            });
          break;
        case "company":
          axios({
            url: `http://localhost:8080/company/${id}/public`,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              console.log(res.data);
              setUser({ name: `${res.data.name}`, image: res.data.logo });
            })
            .catch((error) => {
              console.log(error.code, error.message, error.response.data);
            });
          break;
        default:
      }
      console.log(user);
    }
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${classes.nav}`}
    >
      <div className="container-fluid">
        <Link className={`navbar-item ${classes.logo}`} to="/" id="top">
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
                  to="/product"
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
              <Link to={`/${role}/${id}`}>
                <div className="d-flex ">
                  <img
                    src={user.image ? user.image : "/static/default.jpg"}
                    className={classes.profileImage}
                    alt=""
                  />
                  <h6 className={`my-auto ps-2 ${classes.username}`}>
                    {user.name}
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
                      onClick={() => {
                        localStorage.setItem("role", staticRole);
                        localStorage.setItem("id", staticId);
                        history.push(`/${staticRole}/${staticId}`);
                        window.location.reload();
                      }}
                    >
                      profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => history.push("/change-password")}
                    >
                      change password
                    </button>
                  </li>
                  {team ? (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          localStorage.setItem("role", "team");
                          localStorage.setItem("id", team);
                          history.push(`/team/${team}`);
                          window.location.reload();
                        }}
                      >
                        switch to team account
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setModalShow(true)}
                      >
                        create team
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
                  // onClick={() => {
                  //   history.push("/login");
                  // }}
                >
                  log in
                </button>
              </Link>
              <Link to="/register">
                <button
                  className={`btn ${classes.signIn} `}
                  // onClick={() => {
                  //   history.push("/register");
                  // }}
                >
                  sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <UpdateDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="team"
        userType={role}
      />
    </nav>
  );
}
