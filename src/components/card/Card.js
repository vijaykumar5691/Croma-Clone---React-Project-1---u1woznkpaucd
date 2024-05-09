import React, { useState } from "react";
import styles from "./Card.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";
import { fetcher } from "../../helpers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Star from "../starRating/Star";

const Card = (props) => {
  const [fav, setFav] = useState(false);
  const token = localStorage.getItem("token");

  const handleWishlist = (id) => {
    setFav(!fav);
    if (token) {
      fetcher(
        `ecommerce/wishlist`,
        {
          method: "PATCH",
          body: JSON.stringify({
            productId: `${id}`,
          }),
        },
        true
      );
    } else {
      navigate("/login");
    }
  };

  const handleDeleteWishlist = (id) => {
    if (localStorage.getItem("token")) {
      fetcher(
        `ecommerce/wishlist/${id}`,
        {
          method: "DELETE",
        },
        true
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div key={props.id} className={styles.cardContainer}>
      <Link to={`/product/${props._id}`} className={styles.link}>
        <div className={styles.imgContainer}>
          <img src={props.displayImage} alt="image" className={styles.img} />
        </div>
        <section className={styles.section}>
          <div className={styles.ProductTitle}>
            <h2 className={styles.title}>{props.name}</h2>
          </div>
          <div className={styles.price}>
            <CurrencyRupeeIcon className={styles.currencySymbol} />
            <h2 className={styles.offerPrice}>{props.price}</h2>
            <h2 className={styles.regularPrice}>{props.price}</h2>
          </div>

          <p className={styles.rating}>
            <Star ratings={props.ratings} />
          </p>
        </section>
      </Link>
      <div className={styles.favContainer}>
        <FavoriteBorderOutlinedIcon
          className={styles.favIcon}
          onClick={() => handleWishlist(props._id)}
        />
      </div>
    </div>
  );
};

export default Card;
