import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import SideSearch from "../components/UI/SideSearch/SideSearch";
// import ProjectCard from "../components/ProjectCard/ProjectCard";
import SideFAQ from "../components/UI/SideFAQ/SideFAQ";

import classes from "../components/ProjectCard/ProjectCard.module.css";
import RecommendedProjects from "./RecommendedProjects";
import SavedProjects from "./SavedProjects";
let token = localStorage.getItem("token");
let role = localStorage.getItem("role");

export default function Projects() {
  const [searchKey, setSearchKey] = useState("");
  // console.log(searchKey);
  const [projects, setProjects] = useState([]);
  const savedProjects = useSelector(
    (state) => state.savedProjects.savedProjects
  );
  console.log(savedProjects);
  const filterProjects = (searchKey) => {
    const filteredProjects = projects.filter((project) =>
      project.title.includes(searchKey)
    );
    console.log(filteredProjects);
    if (searchKey !== "") {
      setProjects(filteredProjects);
    }
  };

  const api = axios({
    url: `http://localhost:8080/project`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    api
      .then((res) => {
        // console.log(res.data);
        setProjects(res.data);
        console.log(res.data);
        console.log(projects);
        filterProjects(searchKey);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, [searchKey]);

  // useEffect(() => {
  //   filterProjects(searchKey);
  // }, [searchKey]);

  return (
    <>
      <SideSearch setSearchKey={setSearchKey} />
      <BrowserRouter>
        <main className="col-lg-6 px-3">
          <div className="d-flex justify-content-evenly my-3">
            <Link to="/project/recommended">
              <button
                className={`btn ${classes.projectsBtn} ${classes.projectsBtnActive}`}
              >
                Recommended Projects
              </button>
            </Link>
            <Link to="/project/saved">
              <button className={`btn ${classes.projectsBtn}`}>
                Saved Projects
              </button>
            </Link>
            {(role === "client" || role === "company") && (
              <Link to="/project/add">
                <button className={`btn ${classes.btnPropose}`}>
                  Add your project
                </button>
              </Link>
            )}
          </div>
          <Switch>
            <Route path="/project/recommended" exact>
              <RecommendedProjects projects={projects} />
            </Route>
            <Route path="/project/saved" exact>
              <SavedProjects projects={projects} />
            </Route>
            {/* <Redirect from="/project" to="/project/recommended" /> */}
          </Switch>
        </main>
      </BrowserRouter>
      {/* <main className="col-lg-6 px-3">
        <div className="d-flex justify-content-evenly my-3">
          <Link to="/project">
            <button
              className={`btn ${classes.projectsBtn} ${classes.projectsBtnActive}`}
            >
              Recommended Projects
            </button>
          </Link>
          <Link to="/project/saved">
            <button className={`btn ${classes.projectsBtn}`}>
              Saved Projects
            </button>
          </Link>
          {(role === "client" || role === "company") && (
            <Link to="/project/add">
              <button className={`btn ${classes.btnPropose}`}>
                Add your project
              </button>
            </Link>
          )}
        </div>
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index + 1} />
        ))}
      </main> */}
      <SideFAQ />
    </>
  );
}
