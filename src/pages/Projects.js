import React, { useState, useEffect } from "react";
import axios from "axios";

import SideSearch from "../components/UI/SideSearch/SideSearch";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SideFAQ from "../components/UI/SideFAQ/SideFAQ";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY1OTQ0MTU0NiwiZXhwIjoxNjU5NDQ1MTQ2fQ.BsRtkXi3e2haj6pUEaya4mePXlLfqByvWhHkHosot4A" ||
  localStorage.getItem("token");

export default function Projects() {
  const [projects, setProjects] = useState([]);
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
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  return (
    <>
      <SideSearch />

      <main className="col-lg-6 px-3">
        {console.log(projects)}
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index + 1} />
        ))}
      </main>
      <SideFAQ />
    </>
  );
}
