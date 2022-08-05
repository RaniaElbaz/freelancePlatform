import React from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";

export default function SavedProjects({ projects }) {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard project={project} key={index + 1} />
      ))}
    </>
  );
}
