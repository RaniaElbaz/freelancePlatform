// import React from "react";
// import { Link } from "react-router-dom";
// import SideSearch from "../components/UI/SideSearch/SideSearch";
import ProjectCard from "../components/ProjectCard/ProjectCard";
// import SideFAQ from "../components/UI/SideFAQ/SideFAQ";

// import classes from "../components/ProjectCard/ProjectCard.module.css";

// let token = localStorage.getItem("token");
// let role = localStorage.getItem("role");

export default function RecommendedProjects({ projects }) {
  console.log(projects);
  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard project={project} key={index + 1} />
      ))}
    </>
  );
}
