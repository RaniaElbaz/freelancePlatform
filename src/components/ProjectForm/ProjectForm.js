import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classes from "./ProjectForm.module.css";
let token = localStorage.getItem("token");

export default function ProjectForm(props) {
  const { updateId } = props;
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState({});
  const history = useHistory();

  const categoriesApi = axios({
    url: `http://localhost:8080/category`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const skillsApi = axios({
    url: `http://localhost:8080/skill`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    let api;
    if (updateId) {
      api = axios({
        url: `http://localhost:8080/project/${updateId}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: project,
      });
    } else {
      api = axios({
        url: `http://localhost:8080/project`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: project,
      });
    }
    api
      .then((res) => {
        console.log(res);
        history.push(`/project/${res.data.data}/private`);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  };
  const changeHandler = (e) => {
    let value;
    if (e.target.id === "isInternship") {
      value = e.target.checked;
      console.log(value);
      if (e.target.checked) {
        e.target.parentElement.parentElement.children[0].children[1].disabled = true;
        e.target.parentElement.parentElement.children[0].children[1].value = "";
      } else
        e.target.parentElement.parentElement.children[0].children[1].disabled = false;
    } else if (e.target.id === "skills") {
      let selectedArray = [];
      for (let index = 0; index < e.target.options.length; index++) {
        if (e.target.options[index].selected) {
          selectedArray.push(e.target.options[index].value);
        }
      }
      value = selectedArray;
    } else {
      value = e.target.value;
    }
    setProject({
      ...project,
      [e.target.id]: value,
    });

    //validation handler
  };
  //   console.log(project.isInternship && delete project.budget);
  console.log(project);
  useEffect(() => {
    if (updateId) {
      axios({
        url: `http://localhost:8080/project/${updateId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((oldProject) => {
        setProject(oldProject.data);
      });
    }
    categoriesApi
      .then((res) => {
        setCategories(res.data);
        skillsApi.then((res) => {
          setSkills(res.data);
        });
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);
  return (
    <form className="card p-3 w-50 m-auto" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={project.title}
          placeholder="project title"
          onChange={changeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          minLength="100"
          maxLength="1000"
          placeholder="description"
          value={project.description}
          onChange={changeHandler}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select form-select-md mb-3"
          value={project.category ? project.category._id : "0"}
          id="category"
          onChange={changeHandler}
        >
          {/* {console.log(project.category._id)} */}
          <option disabled value="0">
            select category
          </option>
          {categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="skills" className="form-label">
          Skills
        </label>
        <select
          multiple
          id="skills"
          className="form-select form-select-md mb-3"
          onChange={changeHandler}
        >
          {skills.map((skill, index) => (
            <option
              value={skill._id}
              key={index}
              selected={
                project.skills &&
                project.skills.some((oldSkill) => oldSkill._id === skill._id)
              }
            >
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row mb-2">
        <div className="col-8">
          <label htmlFor="budget" className="form-label">
            Budget (hourly rate)
          </label>
          <input
            type="number"
            className="form-control"
            id="budget"
            min="5"
            value={project.isInternship ? "" : project.budget}
            disabled={project.isInternship ? true : false}
            placeholder="project budget"
            onChange={changeHandler}
          />
        </div>
        <div className="form-check col-4 my-auto pt-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="isInternship"
            disabled={!!updateId}
            checked={project.isInternship}
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            internship
          </label>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="duration" className="form-label">
            Duration (hours)
          </label>
          <input
            type="number"
            className="form-control"
            id="duration"
            placeholder="duration"
            value={project.duration}
            onChange={changeHandler}
          />
        </div>
        <div className="col">
          <label htmlFor="connects" className="form-label">
            Connects
          </label>
          <input
            type="number"
            min="1"
            max="20"
            className="form-control"
            id="connects"
            value={project.connects}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-success w-100" type="submit">
          {updateId ? "Update Project" : "Add Project"}
        </button>
      </div>
    </form>
  );
}
