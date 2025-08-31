// src/components/PricingSectionCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

interface PricingSectionCardProps {
  bannerUrl: string;
  title: string;
  price: number;        // Original price
  offerPrice: number;   // Discounted price
  validation: string;   // e.g., "Lifetime access" or "Valid for 12 months"
  offerText?: string;   // e.g., "50% OFF - Limited Time!"
}

const PricingSectionCard: React.FC<PricingSectionCardProps> = ({
  id,
  bannerUrl,
  title,
  price,
  offerPrice,
  validation,
  offerText,
}) => {

const navigate = useNavigate();
const params = useParams();

const handleClick = () => {
    navigate(`/courses/${params.courseId}/buy`);
  };


  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
      <CardMedia
        component="img"
        image={bannerUrl}
        alt={title}
        sx={{ height: 220, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ textDecoration: "line-through", color: "text.secondary", mr: 2 }}
          >
            ₹{price}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ₹{offerPrice}
          </Typography>
        </Box>
        {offerText && (
          <Typography variant="body1" color="success.main" fontWeight="bold" mb={1}>
            {offerText}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" mb={2}>
          {validation}
        </Typography>
        <Button variant="contained" color="success" fullWidth onClick={handleClick}>
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingSectionCard;
