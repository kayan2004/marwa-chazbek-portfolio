import React from "react";
import ProjectDetails from "./ProjectDetails";
import Projects from "../pages/Projects";
import { NavLink } from "react-router";
const CategoryCard = ({ key, title, image }) => {
  return (
    <div
      key={key}
      id="project-card"
      className=" relative bg-cover bg-center min-h-40 rounded-xl 
      aspect-3/2 flex justify-center items-center max-w-96 "
    >
      <img
        alt={"s"}
        src={image}
        className=" object-center object-cover w-full aspect-3/2 rounded-2xl brightness-50 hover:brightness-75 "
      ></img>

      <NavLink
        to={`/projects/${title.toLowerCase()}`}
        className="absolute border-4 p-2 border-primary text-center text-secondary text-2xl cursor-pointer rounded-xl"
      >
        {title}
      </NavLink>
    </div>
  );
};

export default CategoryCard;
