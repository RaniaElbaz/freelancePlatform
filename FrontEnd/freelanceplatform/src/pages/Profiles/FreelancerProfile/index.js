import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserDetails } from "../../../store/actions/userDetails";
import ProfileImage from "../../../components/Profile/ProfileImage";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ProfileInfo from "../../../components/Profile/ProfileInfo";
import ProfileAbout from "../../../components/Profile/ProfileAbout";
import ProfileSkills from "../../../components/Profile/ProfileSkills";
import ProfileExperience from "../../../components/Profile/ProfileExperience";
import ProfileEducation from "../../../components/Profile/ProfileEducation";
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";
import ProfileCertificates from "../../../components/Profile/ProfileCertificates";
import ProfileProjects from "../../../components/Profile/ProfileProjects";

import "../profile.css";

export default function FreelancerProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState({ id: 0, role: "" });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const params = useParams();
  const dispatch = useDispatch();
  const freelancerDetails = useSelector((state) => state.userDetails);

  const toggleView = () => {
    if (isPublic) {
      setIsPublic(false); //toggle
      getPrivateView(); //to private
    } else {
      //not public
      setIsPublic(true); //toggle
      getPublicView(); //to public
    }
  };

  const getPublicView = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/freelancers/public/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // setFreelancerDetails(response.data);
        dispatch(setUserDetails(response.data));
        console.log("Public", response.data);
      })
      .catch((error) => console.log(error.message));
  };

  const getPrivateView = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/freelancers/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // setFreelancerDetails(response.data);
        dispatch(setUserDetails(response.data));
        console.log("private", response.data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (isPublic) {
      getPublicView();
    } else {
      getPrivateView();
    }
  }, []);

  return (
    <section className="bg-light profile p-2 d-flex flex-column justify-content-center align-items-center">
      <ProfileImage
        imageUrl={
          freelancerDetails.profileImage
            ? freelancerDetails.profileImage
            : require("../../../assets/default_pfp.jpg")
        }
      />
      <ProfileHeader toggleView={toggleView} isPublic={isPublic} />
      <ProfileInfo isPublic={isPublic} />
      <ProfileAbout isPublic={isPublic} />
      <ProfileSkills isPublic={isPublic} />
      {freelancerDetails.testimonials && (
        <ProfileTestimonial isPublic={isPublic} />
      )}
      {freelancerDetails.projects ? (
        freelancerDetails.projects.length ? (
          <ProfileProjects isPublic={isPublic} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <ProfileExperience isPublic={isPublic} />
      <ProfileCertificates isPublic={isPublic} />
      <ProfileEducation
        details={freelancerDetails.education}
        isPublic={isPublic}
      />
    </section>
  );
}
