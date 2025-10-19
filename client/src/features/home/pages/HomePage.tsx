import React from "react";
import BannerSlider from "../components/BannerSlider";
import CoursesCardSlider from "../components/CoursesCardSlider";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const HomePage = () => {
  return (
    <>
      <BannerSlider />
      <CoursesCardSlider />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default HomePage;
