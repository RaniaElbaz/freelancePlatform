import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DetailsCard from "../../DetailsCard/";
import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function ProfileCertificates({ isPublic }) {
  const [index, setIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const freelancerDetails = useSelector((state) => state.userDetails);

  const params = useParams();
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const handleDelete = (idx) => {
    const confirmed = window.confirm("are you sure you want to delete?");
    if (confirmed) {
      setIndex(idx);
      freelancerDetails.certificates.splice(idx, 1);
      dispatch(
        updateUserDetails({ certificates: [...freelancerDetails.certificates] })
      );
      deleteUserCertificates();
    }
  };

  const deleteUserCertificates = () => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/freelancers/${params.id}/remove/certificates`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { index },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="row g-0 w-100 p-2 border-bottom border-1">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> Certificates </h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <section className="col-12">
        {freelancerDetails.certificates ? (
          freelancerDetails.certificates.length ? (
            freelancerDetails.certificates.map((certificate, index) => (
              <DetailsCard
                title={certificate.title}
                subtitle={certificate.organization}
                startDate={certificate.startDate}
                endDate={certificate.endDate}
                url={certificate.url}
                id={certificate.certificateId}
                description={certificate.description}
                key={index}
                deleteButton={true}
                isPublic={isPublic}
                deleteAction={() => handleDelete(index)}
              />
            ))
          ) : (
            <p className="text-center">No Certificates have been added</p>
          )
        ) : (
          <p className="text-center">No Certificates have been added</p>
        )}
      </section>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="certificates"
        userDetails={freelancerDetails.certificates}
      />
    </section>
  );
}
