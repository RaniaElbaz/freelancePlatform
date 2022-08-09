import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import "./profileImage.css";
import UpdateImage from "../../UpdateModals/UpdateImage/";

export default function ProfileImage({ imageUrl }) {
  const [isBooped, setIsBooped] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const imageStyle = {
    opacity: isBooped ? 0.3 : 1,
    transform: isBooped ? `scale(1.1)` : `scale(1)`,
    transition: `transform 200ms`,
  };

  const overlayStyle = {
    opacity: isBooped ? 1 : 0,
  };

  const enter = () => {
    setIsBooped(true);
  };

  const leave = () => {
    setIsBooped(false);
  };

  const params = useParams();

  return (
    <div className="bg-blue w-100 p-3 imageContainer">
      <div className="profileDivImage">
        <img
          className="profileImage rounded-circle"
          src={imageUrl}
          alt="not found"
          title="profile image"
          style={imageStyle}
        />
        <div
          className="overlay"
          style={overlayStyle}
          onMouseEnter={enter}
          onMouseLeave={leave}
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon icon={faCamera} className="icon" />
        </div>
        <UpdateImage show={modalShow} onHide={ ()=>setModalShow(false) } id={ params.id } />
      </div>
    </div>
  );
}
