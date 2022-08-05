import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ProjectForm from "../components/ProjectForm/ProjectForm";

let token = localStorage.getItem("token");

export default function AddProject() {
  // const [categories, setCategories] = useState([]);
  // const [skills, setSkills] = useState([]);
  // const [project, setProject] = useState({});
  // const history = useHistory();

  // const categoriesApi = axios({
  //   url: `http://localhost:8080/category`,
  //   method: "GET",
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });
  // const skillsApi = axios({
  //   url: `http://localhost:8080/skill`,
  //   method: "GET",
  //   headers: {
  //     authorization: `Bearer ${token}`,
  //   },
  // });
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const api = axios({
  //     url: `http://localhost:8080/project`,
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //     data: project,
  //   });
  //   api
  //     .then((res) => {
  //       console.log(res.data);
  //       history.push(`/project/${res.data}/private`);
  //     })
  //     .catch((error) => {
  //       console.log(error.code, error.message, error.response.data);
  //     });
  // };
  // const changeHandler = (e) => {
  //   let value;
  //   if (e.target.id === "isInternship") {
  //     value = e.target.checked;
  //     if (e.target.checked) {
  //       e.target.parentElement.parentElement.children[0].children[1].disabled = true;
  //       e.target.parentElement.parentElement.children[0].children[1].value = "";
  //     } else
  //       e.target.parentElement.parentElement.children[0].children[1].disabled = false;
  //   } else if (e.target.id === "skills") {
  //     let selectedArray = [];
  //     for (let index = 0; index < e.target.options.length; index++) {
  //       if (e.target.options[index].selected) {
  //         selectedArray.push(e.target.options[index].value);
  //       }
  //     }
  //     value = selectedArray;
  //   } else {
  //     value = e.target.value;
  //   }
  //   setProject({
  //     ...project,
  //     [e.target.id]: value,
  //   });

  //   //validation handler
  // };
  // // console.log(project);
  // useEffect(() => {
  //   categoriesApi
  //     .then((res) => {
  //       setCategories(res.data);
  //       skillsApi.then((res) => {
  //         setSkills(res.data);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error.code, error.message, error.response.data);
  //     });
  // }, []);

  return <ProjectForm />;
}
