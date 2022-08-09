import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";

import PrimaryButton from "../../Buttons/PrimaryButton";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function UpdateImage({ id, show, onHide }) {
  let data;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      data = new FormData();
      data.append("image", selectedFile, selectedFile.name);
      updateFreelancerImage();
    } else setErrorMessage("please choose a file!");
  };

  const updateFreelancerImage = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/freelancers/${id}/update/image`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": selectedFile.type,
      },
      data: data,
    })
      .then((response) => {
        setErrorMessage("");
        setSelectedFile(null);
        dispatch(updateUserDetails({ profileImage: response.data.data }));
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong, please try again!");
      });
  };

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
          Profile Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <p className="d-flex justify-content-between align-items-center">
          <Form.Control type="file" onChange={onFileChange} className="w-75" />
          <PrimaryButton action={onFileUpload} title="upload" />
        </p>
        <p className="text-danger"> {errorMessage} </p>
      </Modal.Body>
    </Modal>
  );
}
