import React from "react";
import DeleteButton from "../Buttons/deleteButton";

import "./DetailsCard.css";
import Rating from "../Rating";
import { getDate } from "../../helpers/functions";

export default function DetailsCard({
  title,
  subtitle,
  startDate,
  endDate,
  description,
  rating,
  url,
  id,
  deleteButton,
  deleteAction,
  showDate,
  isPublic,
  pressable
}) {
  return (
    <section
      className="d-flex flex-column materialCard border border-1 px-3 py-2 mb-2"
      style={pressable ? { cursor: "pointer" } : {}}
    >
      {deleteButton && !isPublic && (
        <section className="align-self-end">
          <DeleteButton action={deleteAction} />
        </section>
      )}
      {rating ? <Rating rating={rating} /> : ""}
      <h4>{title}</h4>
      <p className="m-0 fw-bold">{subtitle}</p>
      {showDate && (
        <p className="m-0 text-secondary">
          {startDate ? getDate(startDate) : ""}
          {endDate ? getDate(endDate) : "Present"}
        </p>
      )}
      <p className="m-0 fst-italic description">{description}</p>
      <section className="row g-0">
        <p className="m-0 text-secondary col-12 col-md-6">
          {url ? "url: " + url : ""}
        </p>
        <p className="m-0 text-secondary col-12 col-md-6">
          {id ? "id: " + id : ""}
        </p>
      </section>
    </section>
  );
}
