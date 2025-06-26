import React, { useRef, useState } from "react";
import { NavLink } from "react-router";
import { Blurhash } from "react-blurhash";

const CategoryCard = ({ key, title, image, blurhash }) => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

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

  const isVideo = title === "Animation";

  return (
    <div
      key={key}
      id="project-card"
      className="group relative bg-cover bg-center min-h-40 rounded-xl aspect-3/2 flex justify-center items-center max-w-96"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isVideo && blurhash && !loaded && (
        <Blurhash
          hash={blurhash}
          width={"100%"}
          height={"100%"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="absolute inset-0 w-full h-full rounded-2xl"
        />
      )}
      {isVideo ? (
        <video
          ref={videoRef}
          src={image}
          muted
          loop
          preload="metadata"
          className="object-center object-cover w-full aspect-3/2 rounded-2xl brightness-50 group-hover:brightness-75"
        />
      ) : (
        <img
          alt={"Thumbnail"}
          src={image}
          className={`object-center object-cover w-full aspect-3/2 rounded-2xl brightness-50 group-hover:brightness-75 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
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
