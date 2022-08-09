import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ProfileInfo.css";
import EditButton from "../../Buttons/EditButton";
import UpdateDetails from "../../UpdateModals/UpdateDetails";

export default function ProfileInfo({ isPublic}) {
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <div className="row g-0 infoContainer w-100 align-items-center my-1 border-bottom border-1 px-4 py-3">
      <section className="row g-0 justify-content-between w-100 align-items-center border-bottom border-1 mb-1">
        <section className="col-12 col-md-5">
          <h3>{userDetails.title ? userDetails.title : ""}</h3>
          {userDetails.address ? <p>
            { userDetails.address.city},
            { userDetails.address.state}
            &nbsp; (
            {userDetails.address.postalCode}
            )
          </p> : ""}
        </section>
        {userDetails.phoneNumber
              ? <section className="col-12 col-md-5">
          <h3>Contact Info</h3>
          <FontAwesomeIcon icon={faPhone} style={{ color: "var(--blue)" }} />
          <span>{ "+2" + userDetails.phoneNumber }</span>
        </section>: ""}
      </section>
      <section>
        <section className="row g-0 justify-content-around">
          {userDetails.languages
                ? <section className="materialCard infoTags col-12 col-md mx-1 bg-light infoP p-2 mb-3">
            <p className="w-100 d-flex justify-content-between m-0">
              <span className="fw-bold">languages</span>
              {isPublic ? (
                ""
              ) : (
                <EditButton
                  action={() => setModalShow(true)}
                  style={{ backgroundColor: "var(--blue)" }}
                />
              )}
            </p>
            <p className="d-flex m-0">
              {userDetails.languages.map((language) => (
                    <span
                      key={language}
                      className="mx-1 d-inline-block p-2 tags"
                    >
                      {language}
                    </span>
                  ))}
            </p>
          </section>: ""}
          {userDetails.analytics ? (
            <table className="materialCard infoTags col-12 col-md mx-1 bg-light infoP mb-3">
              <thead>
                <tr>
                  <th className="p-2 text-center col-4">Earnings</th>
                  <th className="p-2 text-center col-4">Hours</th>
                  <th className="p-2 text-center col-4">Jobs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center col-4">
                    {userDetails.analytics.earnings}$
                  </td>
                  <td className="text-center col-4">
                    {userDetails.analytics.hours}
                  </td>
                  <td className="text-center col-4">
                    {userDetails.analytics.jobs}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}
        </section>
        <section className="row g-0 justify-content-around">
          <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
            <span className="fw-bold">hourly rate</span>
            <br />
            <span>{userDetails.hourlyRate}$/hour</span>
          </p>
          <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
            <span className="fw-bold">hours/week</span> <br />
            <span>{userDetails.hoursPerWeek + " "}hours</span>
          </p>
          {userDetails.connects ? (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">connects</span> <br />
              <span> {userDetails.connects + " "}</span>
            </p>
          ) : (
            ""
          )}
          {userDetails.wallet >= 0 ? (
            <p className="materialCard text-center col-5 col-md mx-1 bg-light infoP">
              <span className="fw-bold">wallet</span> <br />
              <span>{userDetails.wallet}$</span>
            </p>
          ) : (
            ""
          )}
        </section>
      </section>
      <UpdateDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="languages"
        userLanguages={userDetails.languages}
      />
    </div>
  );
}
