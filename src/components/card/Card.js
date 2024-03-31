import React from "react";
import styles from "./Card.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useParams } from "react-router-dom";

const Card = (props) => {
  const { productId } = useParams();
  return (
    <div className={styles.cardContainer}>
      <Link to={`/products/${productId}`}>
        <div className={imgContainer}>
          <img src={img} alt="image" className={styles.img} />
          <FavoriteBorderOutlinedIcon className={styles.favIcon} />
        </div>
        <section className={styles.section}>
          <h2 className={styles.title}>Product Title</h2>
          <div className={styles.price}>
            <h2 className={styles.offerPrice}>Offer Price</h2>
            <h2 className={styles.regularPrice}>Regular Price</h2>
          </div>

          <p className={styles.rating}>Product Rating</p>
        </section>
      </Link>
    </div>
  );
};

export default Card;
