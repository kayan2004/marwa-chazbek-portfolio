import React from "react";

const ProjectDetails = ({ title, description }) => {
  return (
    <>
      <h3 className="uppercase text-xl text-primary"> {title}</h3>
      <p>{description}</p>
    </>
  );
};

export default ProjectDetails;
