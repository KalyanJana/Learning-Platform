import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  "https://res.cloudinary.com/diwn8dfxk/image/upload/v1760275892/download_jum6ep.jpg",
  "https://res.cloudinary.com/diwn8dfxk/image/upload/v1759756521/React_banner_image_rvmoky.jpg",
  "https://res.cloudinary.com/diwn8dfxk/image/upload/v1760275892/download_jum6ep.jpg",
];

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Box
      sx={{ maxWidth: "1200px", margin: "auto", mt: 2, position: "relative" }}
    >
      <Slider {...settings}>
        {bannerImages.map((img, i) => (
          <Box
            key={i}
            sx={{
              height: { xs: 200, sm: 300, md: 400 }, // Responsive heights
              overflow: "hidden",
              position: "relative",
              borderRadius: 2
            }}
          >
            <img
              src={img}
              alt={`Banner ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Slider>
      {/* Add custom arrow styles in global CSS if still not visible */}
    </Box>
  );
};

export default BannerSlider;
