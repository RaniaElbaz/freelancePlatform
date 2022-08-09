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
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";
import ProfileProjects from "../../../components/Profile/ProfileProjects";
import ProfileMembers from "../../../components/Profile/ProfileMembers";

import "../profile.css";

export default function TeamProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState({ id: 0, role: "" });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJmcmVlbGFuY2VyIiwiaWF0IjoxNjYwMDIzNTMyLCJleHAiOjE2NjAwMjcxMzJ9.TgvGVgaNv5Mmhg_5JiiN3FLWw-tNHkDSfc3EvVqQKDw";

  const params = useParams();
  const dispatch = useDispatch();
  const teamDetails = useSelector((state) => state.userDetails);

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
      url: `http://localhost:8080/team/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(setUserDetails(response.data));
        console.log("Public", response.data);
      })
      .catch((error) => console.log(error.message));
  };

  const getPrivateView = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/team/${params.id}/private`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
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
          teamDetails.logo
            ? teamDetails.logo
            : require("../../../assets/default_pfp.jpg")
        }
      />
      <ProfileHeader toggleView={toggleView} isPublic={isPublic} />
      <ProfileInfo isPublic={isPublic} />
      <ProfileAbout isPublic={isPublic} />
      <ProfileSkills isPublic={isPublic} />
      {teamDetails.testimonials && <ProfileTestimonial isPublic={isPublic} />}
      {teamDetails.projects && teamDetails.projects.length ? (
        <ProfileProjects isPublic={isPublic} />
      ) : (
        ""
      )}
      <ProfileMembers isPublic={isPublic} />
    </section>
  );
}
