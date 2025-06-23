import React from "react";
import CategoryCard from "./CategoryCard";
import bgimage from "../assets/background-image.png";
const Content = () => {
  const projectSections = [
    "BFA project",
    "branding",
    "editorial",
    "illustration",
    "packaging",
    "photography",
    "animation",
    "3D modeling",
  ];
  return (
    <div className="grid gap-10">
      <section>
        <h2 className="text-primary text-3xl uppercase"> About me</h2>
        <p className="text-secondary text-sm font-thin">
          My name is Sophia Hallal I’m a graphic designer with a Bachelor’s
          degree from ALBA, Balamand University, and I’m passionate about
          bringing ideas to life through thoughtful visuals. My work specializes
          in branding, illustration, and 2D animation, where creativity and
          storytelling come together to leave a lasting impression.
        </p>
      </section>
      <section>
        <h2 className="text-primary text-3xl uppercase mb-8"> My projects</h2>
        <div className="grid gap-5 sm:grid-cols-2 overflow-hidden ">
          {projectSections.map((section) => (
            <>
              <CategoryCard key={section} title={section} image={bgimage} />
            </>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Content;
