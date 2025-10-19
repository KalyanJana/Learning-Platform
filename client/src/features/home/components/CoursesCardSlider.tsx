import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const courses = [
  {
    image:
      "https://res.cloudinary.com/diwn8dfxk/image/upload/v1760275892/download_jum6ep.jpg",
    title: "Course 1",
    description:
      "This is a brief description of Course 1. Learn the fundamentals and advanced concepts.",
  },
  {
    image:
      "https://res.cloudinary.com/diwn8dfxk/image/upload/v1759756521/React_banner_image_rvmoky.jpg",
    title: "Course 2",
    description:
      "An introduction to Course 2 including important concepts and real-world examples.",
  },
  {
    image:
      "https://res.cloudinary.com/diwn8dfxk/image/upload/v1760275892/download_jum6ep.jpg",
    title: "Course 3",
    description:
      "Deep dive into Course 3 content, perfect for intermediate learners.",
  },
  {
    image:
      "https://res.cloudinary.com/diwn8dfxk/image/upload/v1759756521/React_banner_image_rvmoky.jpg",
    title: "Course 4",
    description:
      "Explore Course 4 with practical and theoretical knowledge enhancing your skills.",
  },
];

const CoursesCardSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", mt: 4, mb: 4 }}>
      <Slider {...settings}>
        {courses.map((course, index) => (
            <Box key={index} sx={{ p: 1 }}>
          <Card
            key={index}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={course.image}
              alt={course.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ height: 60, overflow: "hidden" }}
              >
                {course.description}
              </Typography>
              <Button size="small" sx={{ mt: 1 }} variant="outlined">
                More Details
              </Button>
            </CardContent>
          </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CoursesCardSlider;
