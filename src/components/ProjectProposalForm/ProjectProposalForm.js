import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

let token = localStorage.getItem("token");
export default function ProjectProposalForm() {
  const [proposal, setProposal] = useState({});
  const params = useParams({});
  const history = useHistory();

  const changeHandler = (e) => {
    if (e.target.id === "text") {
      setProposal({ ...proposal, text: e.target.value });
    } else if (e.target.id === "files") {
      setProposal({ ...proposal, files: Array.from(e.target.files) });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", proposal.text);
    formData.append("files", proposal.files);
    const api = axios({
      url: `http://localhost:8080/project/${params.id}/proposal`,
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    api
      .then((res) => {
        console.log(res);
        history.push(`/project`);
      })
      .catch((error) => {
        console.log(formData);
        console.log(error.code, error.message, error.response.data);
      });
  };

  return (
    <form className="card p-3 w-50 m-auto" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Proposal
        </label>
        <textarea
          className="form-control"
          id="text"
          rows="10"
          minLength="100"
          maxLength="1000"
          placeholder="proposal text"
          onChange={changeHandler}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="files" className="form-label">
          Files
        </label>
        <input
          className="form-control"
          type="file"
          id="files"
          multiple
          onChange={changeHandler}
        />
      </div>
      <div>
        <button className="btn btn-success w-100" type="submit">
          submit Proposal
        </button>
      </div>
    </form>
  );
}
