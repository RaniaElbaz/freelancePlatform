import React, { useState } from "react";
import { useSelector } from "react-redux";

import DetailsCard from "../../DetailsCard";
import IconizedButton from "../../Buttons/IconizedButton";
import UpdateTestimonial from "../../UpdateModals/UpdateTestimonial";

export default function ProfileTestimonial({ isPublic }) {
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <section className="w-100 p-2 border-bottom border-1">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2>Testimonial</h2>
        {!isPublic && (
            <IconizedButton>
              {" "}
              Send A Testimonial{" "}
            </IconizedButton>
        )}
      </section>
      {userDetails.testimonials && userDetails.testimonials.length
        ? userDetails.testimonials.map((testimonial, index) => (
            <DetailsCard
              title={testimonial.project.title}
              subtitle={testimonial.project.category.name}
              startDate={testimonial.project.startTime}
              endDate={testimonial.project.endTime}
              description={testimonial.comment}
              rating={testimonial.rating}
              key={index}
            />
          ))
        : "Nothing to show yet"}
      <UpdateTestimonial show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
}
