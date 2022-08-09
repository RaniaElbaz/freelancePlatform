import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import DropDownList from "../../dropDown";
import PrimaryButton from "../../Buttons/PrimaryButton";

export default function UpdateTestimonial({ show, onHide }) {
  const [data, setData] = useState({});
  const [clients, setClients] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const params = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const dataToBeSent = { skills: [] };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const getClients = () => {
    //send a request to get clients (userDetails.testimonials.projects.recruiter) from projects
    // setClients(response.data...)
  };

  const sendTestimonialBack = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/freelancers/${params.id}/update`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        setErrorMessage("");
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {};

  useEffect(() => {
    getClients();
  }, []); //didMount

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-lightBlue">
        <Modal.Title id="contained-modal-title-vcenter">
          Send A Testimonial
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        {clients ? <DropDownList options={clients} /> : ""}
      </Modal.Body>
      <Modal.Footer className="justify-content-end bg-light">
        <PrimaryButton action={handleSubmit} title="submit" />
      </Modal.Footer>
    </Modal>
  );
}
