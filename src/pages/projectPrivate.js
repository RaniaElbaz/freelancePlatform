import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

import ProjectCard from "../components/ProjectCard/ProjectCard";
import classes from "../components/ProjectCard/ProjectCard.module.css";
import ProjectProposals from "../components/ProjectProposals/ProjectProposals";

let token = localStorage.getItem("token");

export default function ProjectPrivate() {
  const [project, setProject] = useState({});
  const params = useParams();
  const history = useHistory();
  console.log(params);
  const api = axios({
    url: `http://localhost:8080/project/${params.id}/private`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const deleteHandler = () => {
    axios({
      url: `http://localhost:8080/project/${params.id}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        console.log("deleted");
        history.push("/profile");
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  };
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
    <>
      <ProjectProposals project={project._id} />
      <main className="col-lg-6 mt-3 px-3">
        <div className={`text-center`}>
          <Link to={`/project/${project._id}`}>
            <button className={`btn ${classes.projectsBtn} mb-3`}>
              view your project in public view
            </button>
          </Link>
        </div>
        <ProjectCard project={project} details="true" privateView="true" />
        {/* <div className={`text-center`}>
            <Link to={`/project/${project._id}/private`}>
              <button className={`btn ${classes.projectsBtn}`}>
                view your project in private view
              </button>
            </Link>
          </div> */}
      </main>
      <aside className="col-lg-3 text-center">
        {/* <div className={`d-flex justify-content-evenly`}> */}
        <Link to={`/project/${project._id}/update`}>
          <button className={`btn ${classes.updateBtn} d-block`}>update</button>
        </Link>
        {/* <Link to={`/project/${project._id}/delete`}> */}
        <button
          className={`btn ${classes.deleteBtn} d-block`}
          onClick={deleteHandler}
        >
          delete
        </button>
        {/* </Link> */}
        {/* </div> */}
      </aside>
    </>
  );
}
