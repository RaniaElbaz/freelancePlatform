import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ProjectCard from "../components/ProjectCard/ProjectCard";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTY1OTQ0MTU0NiwiZXhwIjoxNjU5NDQ1MTQ2fQ.BsRtkXi3e2haj6pUEaya4mePXlLfqByvWhHkHosot4A" ||
  localStorage.getItem("token");

export default function Project() {
  const [project, setProject] = useState({});
  const params = useParams();
  const api = axios({
    url: `http://localhost:8080/project/${params.id}`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    api
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);
  return (
    <main className="offset-lg-3 col-lg-6">
      <ProjectCard project={project} details="true" />
    </main>
  );
}
