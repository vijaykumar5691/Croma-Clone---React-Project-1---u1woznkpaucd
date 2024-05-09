import React from "react";
import styles from "./Star.module.css";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Star = ({ ratings }) => {
  const stars = Array.from({ length: 5 }, (ele, i) => {
    let number = i + 0.5;
    return (
      <span key={i} className={styles.star}>
        {ratings >= i + 1 ? (
          <StarIcon
            sx={{ color: "rgb(16, 202, 140)", backgroundColor: "#0d0d0d" }}
            fontSize="small"
          />
        ) : ratings >= number ? (
          <StarHalfIcon
            sx={{ color: "rgb(16, 202, 140)", backgroundColor: "#0d0d0d" }}
            fontSize="small"
          />
        ) : (
          <StarBorderIcon
            fontSize="small"
            sx={{ backgroundColor: "#0d0d0d" }}
          />
        )}
      </span>
    );
  });
  return <div className={styles.starsContainer}>{stars}</div>;
};

export default Star;
