// src/components/CourseCard/CourseCard.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  bannerUrl: string;
  title: string;
  lessons: number;
  price?: string;
  isEnrolled?: boolean;
  _id: string;
}

const HoverCard = styled(Card)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#90ee9022", // light seegreen with transparency
  },
}));

const CourseCard: React.FC<CourseCardProps> = ({
  bannerUrl,
  title,
  lessons,
  price,
  isEnrolled = false,
  _id,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${_id}`);
  };
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <HoverCard onClick={handleClick} sx={{ cursor: "pointer" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={bannerUrl}
          alt={title}
          sx={{
            width: isMobile ? "100%" : 160,
            height: 120,
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2" color="textSecondary" mt={1}>
            {lessons} Lessons
          </Typography>
        </CardContent>
        {!isEnrolled && price && (
          <Box
            sx={{
              px: 3,
              pr: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#90ee90" : "seagreen",
            }}
          >
            {price}
          </Box>
        )}
      </Box>
    </HoverCard>
  );
};

export default CourseCard;
