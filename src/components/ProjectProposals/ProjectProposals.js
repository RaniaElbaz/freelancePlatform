import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ProjectProposals.module.css";
import buttons from "../buttons.module.css";

let token = localStorage.getItem("token");

export default function ProjectProposals() {
  const [project, setProject] = useState([]);
  const [talents, setTalents] = useState([]);
  const params = useParams();
  const selectProposalHandler = (e) => {
    console.log(e.target.id);
    console.log(talents[e.target.id]);
    // const selectProposalApi = axios({
    //   url: `http://localhost:8080/project/${params.id}/proposal`,
    //   method: "POST",
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },

    // });
  };
  useEffect(() => {
    console.log(talents);
    axios({
      url: `http://localhost:8080/project/${params.id}/proposal`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setProject(res.data);
        for (let proposal of res.data.proposals) {
          console.log(proposal.talent.id);
          if (proposal.talent.type === "freelancers") {
            axios({
              url: `http://localhost:8080/freelancers/public/${proposal.talent.id}`,
              method: "GET",
              headers: {
                authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              console.log(res);
              setTalents([
                ...talents,
                {
                  id: `${res.data._id}`,
                  name: `${res.data.firstName} ${res.data.lastName}`,
                  type: "freelancer",
                },
              ]);
            });
          } else if (proposal.talent.type === "teams") {
            axios({
              url: `http://localhost:8080/team/${proposal.talent.id}`,
              method: "GET",
              headers: {
                authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              setTalents([
                ...talents,
                {
                  id: `${res.data._id}`,
                  name: `${res.data.name}`,
                  type: "team",
                },
              ]);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);

  return (
    <div className="col-lg-3">
      {project.recruiter && project.proposals.length > 0 ? (
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {project.proposals.map((proposal, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${index}`}
                >
                  proposal #{index + 1}
                </button>
              </h2>
              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {/* {talents.length > 0 && (
                    <>
                      <h5 className={`${classes.talent}`}>
                        {talents[index].name}
                        <span>({talents[index].type})</span>
                      </h5>
                    </>
                  )} */}
                  <p className="w-100">{proposal.text}</p>
                </div>
                <div className="text-center">
                  <button
                    className={`btn ${buttons.regularBeige}`}
                    onClick={selectProposalHandler}
                    id={index}
                  >
                    select proposal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">no proposals yet</div>
      )}
    </div>
  );
}
