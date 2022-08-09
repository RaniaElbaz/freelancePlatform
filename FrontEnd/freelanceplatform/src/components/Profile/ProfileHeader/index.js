import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./ProfileHeader.css";
import EditButton from "../../Buttons/EditButton/";
import UpdateDetails from "../../UpdateModals/UpdateDetails/";
import IconizedButton from "../../Buttons/IconizedButton";

export default function ProfileHeader({ toggleView, isPublic }) {
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <div className="bg-blue d-flex justify-content-between w-100 align-items-center border-bottom border-1 text-light">
      <h1 className="px-4">
        {userDetails.firstName
          ? userDetails.firstName
          : userDetails.name
          ? userDetails.name
          : ""}
        &nbsp;
        {userDetails.lastName
          ? userDetails.lastName
          : ""}
        <span className="mx-1">
          {userDetails.isVerified ? (
            <FontAwesomeIcon
              icon={faCheckCircle}
              size={"2xs"}
              className="verified"
            />
          ) : (
            ""
          )}
        </span>
      </h1>

      <section className="buttons d-flex align-items-center px-3">
        {isPublic ? "" : <EditButton action={() => setModalShow(true)} />}
        <IconizedButton
          action={toggleView}
          icon={<FontAwesomeIcon icon={faEye} />}
        >
          {isPublic ? "Private View" : "Public View"}
        </IconizedButton>
      </section>

      <UpdateDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="details"
      />
    </div>
  );
}
