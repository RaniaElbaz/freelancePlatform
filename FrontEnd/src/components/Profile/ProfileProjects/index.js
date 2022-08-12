import React from "react";

import DetailsCard from "../../DetailsCard";

export default function ProfileProjects({ userDetails }) {
  if(userDetails.projects.length) {
    return (
      <section className="w-100 mb-3">
        <section className="subTitle">
          <h2> Projects In Progress </h2>
        </section>

        <section>
          {userDetails.projects.map((project, index) => (
            <DetailsCard
              title={
                project.title +
                " " +
                (project.isInternship ? " (internship)" : "")
              }
              subtitle={
                project.duration +
                " hrs " +
                (project.budget? project.budget + "$": "")
              }
              showDate={true}
              startDate={project.startTime}
              description={`${project.category.name}: ${project.description}`}
              key={index}
            />
          ))}
        </section>
      </section>
    );
  }
}
