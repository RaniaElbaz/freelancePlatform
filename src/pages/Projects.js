import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Switch, Redirect, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import SideSearch from "../components/UI/SideSearch/SideSearch";
// import ProjectCard from "../components/ProjectCard/ProjectCard";
import SideFAQ from "../components/UI/SideFAQ/SideFAQ";

import classes from "../components/ProjectCard/ProjectCard.module.css";
import buttons from "../components/buttons.module.css";
import RecommendedProjects from "./RecommendedProjects";
import SavedProjects from "./SavedProjects";
let token = localStorage.getItem("token");
let role = localStorage.getItem("role");

export default function Projects() {
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilterKey, setCategoryFilterKey] = useState([]);
  const [skillFilterKey, setSkillFilterKey] = useState([]);
  const [projects, setProjects] = useState([]);
  const [recommendedBtn, setRecommendedBtn] = useState(true);
  const [savedBtn, setSavedBtn] = useState(false);
  const history = useHistory();
  const savedProjects = useSelector(
    (state) => state.savedProjectsReducer.savedProjects
  );
  console.log(savedProjects);
  const filterProjects = (searchKey, categoryFilterKey, skillFilterKey) => {
    console.log(searchKey, categoryFilterKey, skillFilterKey);
    let filteredProjects = projects.filter(
      (project) => project.title.includes(searchKey)
      // && categoryFilterKey.includes(String(project.category._id))
      //  && skillFilterKey.includes(project.skill._id)
    );
    filteredProjects = filteredProjects.filter((project) =>
      categoryFilterKey.includes(String(project.category._id))
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
        setProjects(res.data);
        filterProjects(searchKey, categoryFilterKey, skillFilterKey);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, [searchKey, categoryFilterKey, skillFilterKey]);

  return (
    <>
      <SideSearch
        setSearchKey={setSearchKey}
        setCategoryFilterKey={setCategoryFilterKey}
        setSkillFilterKey={setSkillFilterKey}
      />
      <main className="col-lg-6 px-3">
        <div className="d-flex justify-content-evenly my-3">
          <button
            className={`btn ${classes.projectsBtn} ${classes.projectsBtnActive}`}
            onClick={() => {
              setRecommendedBtn(true);
              setSavedBtn(false);
            }}
          >
            Recommended Projects
          </button>
          <button
            className={`btn ${classes.projectsBtn}`}
            onClick={() => {
              setRecommendedBtn(false);
              setSavedBtn(true);
            }}
          >
            Saved Projects
          </button>
          {(role === "client" || role === "company") && (
            <button
              className={`btn ${buttons.regularBeige}`}
              onClick={() => {
                history.push("/project/add");
              }}
            >
              Add your project
            </button>
          )}
        </div>
        {recommendedBtn && <RecommendedProjects projects={projects} />}
        {savedBtn && <SavedProjects projects={savedProjects} />}
      </main>
      <SideFAQ />
    </>
  );
}
