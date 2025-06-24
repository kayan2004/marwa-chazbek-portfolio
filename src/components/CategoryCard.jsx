import React, { useRef } from "react";
import { NavLink } from "react-router";

const CategoryCard = ({ key, title, image }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      key={key}
      id="project-card"
      className="group relative bg-cover bg-center min-h-40 rounded-xl aspect-3/2 flex justify-center items-center max-w-96"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title !== "Animation" ? (
        <img
          alt={"Thumbnail"}
          src={image}
          className="object-center object-cover w-full aspect-3/2 rounded-2xl brightness-50 group-hover:brightness-75"
        />
      ) : (
        <video
          ref={videoRef}
          src={image}
          muted
          loop
          preload="metadata"
          className="object-center object-cover w-full aspect-3/2 rounded-2xl brightness-50 group-hover:brightness-75"
        />
      )}

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
