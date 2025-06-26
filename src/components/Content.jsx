import React from "react";
import CategoryCard from "./CategoryCard";
const Content = ({ aboutMe }) => {
  const projectSections = [
    {
      name: "BFA project",
      thumbnail: "/assets/projects/bfa project/Slide49.PNG",
      blurhash: "L#OW$=nit8ayofayj[fR~pf+WAoe",
    },
    {
      name: "Branding",
      thumbnail:
        "/assets/projects/branding/chouf trails/Free Outdoor Wide Billboard Mockup.png",
      blurhash: "LnE:xwt6R:WrX=j[WCWX9FWFxVoc",
    },
    {
      name: "Editorial",
      thumbnail:
        "/assets/projects/editorial/bilingual magazine/01 Free Open A4 Magazine Mockup On Concr2ete.png",
      blurhash: "LONdK~x]%M%2~q%MoMRjbbM{M{R*",
    },
    {
      name: "Illustration",
      thumbnail: "/assets/projects/illustration/self portrait/3.png",
      blurhash: "LxOf.Lt4~pM{?aj]IqniX9bEVrkC",
    },
    {
      name: "Packaging",
      thumbnail: "/assets/projects/packaging/Image0005.png",
      blurhash: "LAH1*ZRU00%Z.RtRMeIB03xC~AI]",
    },
    {
      name: "Photography",
      thumbnail: "/assets/projects/photography/street photography/jbeil 28.jpg",
      blurhash: "LGGHk}~DG^K*pv?^-V~D?I$%X.I[",
    },
    {
      name: "Animation",
      thumbnail: "/assets/projects/animation/marwa_chazbek_ball_animation.mp4",
      blurhash: null,
    },
    {
      name: "3D modeling",
      thumbnail: "/assets/projects/3d modeling/moon clock/moon1.jpg",
      blurhash: "L84xfQx|9$E3R.WXoJoIITRi%0xs",
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
                blurhash={section.blurhash}
              />
            </>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Content;
