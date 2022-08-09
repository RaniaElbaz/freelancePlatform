import React from "react";
import { useSelector } from "react-redux";

import DetailsCard from "../../DetailsCard";

export default function ProfileProjects() {
  const userDetails = useSelector((state) => state.userDetails);
  return (
    <section className="w-100 p-2 border-bottom border-1">
      <section className="subTitle">
        <h2> Projects In Progress </h2>
      </section>
      <section>
        {userDetails.projects
          ? userDetails.projects.map((project, index) => (
              <DetailsCard
                title={project.title}
                subtitle={project.duration + " hrs - " + project.budget + "$"}
                startDate={project.startTime}
                description={`${project.category.name}: ${project.description}`}
                key={index}
              />
            ))
          : ""}
      </section>
    </section>
  );
}
