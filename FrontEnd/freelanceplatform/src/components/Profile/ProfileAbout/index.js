import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditButton from "../../Buttons/EditButton/";
import UpdateDetails from "../../UpdateModals/UpdateDetails";

export default function ProfileAbout({ isPublic }) {
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <section className="w-100 p-2 border-bottom border-1">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> About {userDetails.firstName}</h2>
        {isPublic ? "" : <EditButton action={() => setModalShow(true)} />}
      </section>
      <p className="materialCard p-3 description">
        {" "}
        {userDetails.description
          ? userDetails.description
          : "No description has been added yet"}
      </p>
      <UpdateDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="about"
        userAbout={userDetails.description}
      />
    </section>
  );
}
