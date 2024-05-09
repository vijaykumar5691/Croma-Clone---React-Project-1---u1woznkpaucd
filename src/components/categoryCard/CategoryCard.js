import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ img, type }) => {
  return (
    <div className={styles.container}>
      <Link to={`/categoryproducts/${type}`}>
        <div className={styles.imgContainer}>
          <img src={img} alt="image" className={styles.img} />
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
