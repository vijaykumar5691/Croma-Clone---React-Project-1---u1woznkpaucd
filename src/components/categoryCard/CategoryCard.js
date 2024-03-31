import React from "react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ img, type }) => {
  return (
    <div className={styles.container}>
      CategoryCard
      <div className={styles.imgContainer}>
        <img src={img} alt="image" className={styles.img} />
      </div>
      <h3 className={styles.heading}>{type} </h3>
    </div>
  );
};

export default CategoryCard;
