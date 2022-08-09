import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DetailsCard from "../../DetailsCard/";
import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function ProfileMembers({ isPublic }) {
  const [index, setIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const teamDetails = useSelector((state) => state.userDetails);

  const params = useParams();
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const handleDelete = (idx) => {
    const confirmed = window.confirm(
      "are you sure you want to remove this memeber?"
    );
    if (confirmed) {
      setIndex(idx);
      teamDetails.members.splice(idx, 1);
      dispatch(updateUserDetails({ memebers: [...teamDetails.memebers] }));
      //   deleteTeamMemeber();
    }
  };

  //   const deleteTeamMemeber = () => {
  //     axios({
  //       method: "PUT",
  //       url: `http://localhost:8080/teams/${params.id}/remove/memebers`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: { index },
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => console.log(error));
  //   };

  return (
    <section className="row g-0 w-100 p-2 border-bottom border-1">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> Team Members </h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <section className="col-12">
        {teamDetails.members && teamDetails.members.length
          ? teamDetails.members.map((freelancer, index) => (
              <DetailsCard
                title={freelancer.firstName + freelancer.lastName}
                subtitle={freelancer.title}
                description={freelancer.description}
                key={index}
                showDate={false}
                deleteButton={true}
                isPublic={isPublic}
                pressable={true}
                deleteAction={() => handleDelete(index)}
              />
            ))
          : ""}
      </section>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="certificates"
        userDetails={teamDetails.certificates}
      />
    </section>
  );
}
