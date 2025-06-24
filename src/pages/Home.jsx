import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Home = () => {
  const aboutMe =
    "My name is Marwa Chazbek I’m a graphic designer with a Bachelor’s degree from ALBA, Balamand University, and I’m passionate about bringing ideas to life through thoughtful visuals. My work specializes in branding, illustration, and Photography, where creativity and storytelling come together to leave a lasting impression.";

  const contact = {
    gmail: "marwachazbek@gmail.com",
    phone: "+961 70 305 726",
    address: "Beirut, Lebanon",
    linkedin: "https://www.linkedin.com/in/your-linkedin-username",
    behance: "https://www.behance.net/your-behance-username",
  };
  return (
    <>
      <Header></Header>
      <Content aboutMe={aboutMe}></Content>
      <Footer contacts={contact}></Footer>
    </>
  );
};

export default Home;
