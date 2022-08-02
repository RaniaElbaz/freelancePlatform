import React from "react";
import { Link } from "react-router-dom";
import classes from "./ProjectCard.module.css";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisV,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
function formatDate(date) {
  let formated = new Date(date);
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return formated.toLocaleDateString("en-US", options);
}

export default function ProjectCard(props) {
  console.log(props);

  const { project, details } = props;
  console.log(project.recruiter);
  console.log(new Date(project.createdAt));
  return (
    <div className={`card mb-2 ${classes.projectCard} ${classes.lightText}`}>
      <div className={`card-body ${classes.cardBody}`}>
        <div className={`d-flex justify-content-between`}>
          {/* <a href="s" className={`text-decoration-none`}> */}
          <Link
            to={`/project/${project._id}`}
            className={`card-title ${classes.cardTitle}`}
          >
            {project.title}
          </Link>
          {/* </a> */}

          <div className="">
            <span className={classes.show}>
              <FaRegHeart />
              <button className={`btn ms-3 ${classes.btnPropose}`}>
                propose
              </button>
            </span>
            <div className="d-inline-block ps-3" data-bs-toggle="dropdown">
              <FaEllipsisV />
              <ul className="dropdown-menu  text-small shadow">
                <li>
                  <a className="dropdown-item" href="s">
                    add to favourites
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="s">
                    propose
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="s">
                    report
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h6 className={classes.date}>{formatDate(project.createdAt)}</h6>
        <h6 className={classes.connects}>
          5 <span>connects</span>
        </h6>
        <p className="p-0">
          <b> {project.isInternship ? "internship" : "$" + project.budget}</b>
        </p>
        <p className={`card-text p-0 ${classes.cardText}`}>
          {project.description}
        </p>
        {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
      </div>
      {project.category && project.skills && (
        <div className={`card-footer ${classes.cardMiddle}`}>
          <span className={`mx-2 ${classes.category}`}>
            {project.category["name"]}
          </span>
          <div className={`text-center ${classes.skills}`}>
            <ul className="px-0">
              {project.skills.map((skill, index) => (
                <li key={index}>{skill["name"]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {details && project.recruiter && (
        <div className={`card-footer ${classes.cardFooter}`}>
          <div className="d-inline-block">
            <img
              className={classes.recruiterImage}
              src=
              // {
                // project.recruiter.id.logo
                //   ? project.recruiter.id.logo
                //   : project.recruiter.id.image &&
                "/public/static/default.png"
              // }
              alt="noimage"
            />
          </div>
          <span className="mx-2">{`${project.recruiter.id.firstName} ${project.recruiter.id.lastName}`}</span>
          <span>
            <FaMoneyBillWaveAlt />
            <b> ${project.recruiter.id.analytics.spent}</b>
          </span>
          <span>
            <IoLocationSharp />
            {project.recruiter.id.location.city}
          </span>
        </div>
      )}
    </div>
  );
}
