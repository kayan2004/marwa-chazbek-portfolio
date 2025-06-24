import React from "react";
import CategoryCard from "./CategoryCard";
const Content = ({ aboutMe }) => {
  const projectSections = [
    {
      name: "BFA project",
      thumbnail: "/assets/projects/bfa project/Slide49.PNG",
    },
    {
      name: "Branding",
      thumbnail:
        "/public/assets/projects/branding/chouf trails/Free Outdoor Wide Billboard Mockup.png",
    },
    {
      name: "Editorial",
      thumbnail:
        "/assets/projects/editorial/bilingual magazine/01 Free Open A4 Magazine Mockup On Concr2ete.png",
    },
    {
      name: "Illustration",
      thumbnail: "/assets/projects/illustration/self portrait/3.png",
    },
    {
      name: "Packaging",
      thumbnail: "/assets/projects/packaging/Image0005.png",
    },
    {
      name: "Photography",
      thumbnail: "/assets/projects/photography/street photography/jbeil 28.jpg",
    },
    {
      name: "Animation",
      thumbnail: "/assets/projects/animation/marwa_chazbek_ball_animation.mp4",
    },
    {
      name: "3D modeling",
      thumbnail: "/assets/projects/3d modeling/moon clock/moon1.jpg",
    },
  ];
  return (
    <main className="grid gap-10">
      <section>
        <h2 className="text-primary text-3xl uppercase"> About me</h2>
        <p className="text-secondary text-sm font-thin">{aboutMe}</p>
      </section>
      <section>
        <h2 className="text-primary text-3xl uppercase mb-8"> My projects</h2>
        <div className="grid gap-5 sm:grid-cols-2 overflow-hidden ">
          {projectSections.map((section) => (
            <>
              <CategoryCard
                key={section.name}
                title={section.name}
                image={section.thumbnail}
              />
            </>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Content;
