import React from "react";
import styles from "./ProductCard.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";
import { fetcher } from "../../helpers";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = (props) => {
  const token = localStorage.getItem("token");
  const handleWishlist = (id) => {
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
  return (
    <div className={styles.productCard} key={props._id}>
      <div className={styles.favContainer}>
        <FavoriteBorderOutlinedIcon
          className={styles.favIcon}
          onClick={() => handleWishlist(props._id)}
        />
      </div>
      <Link to={`/product/${props._id}`} className={styles.link}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src={props.displayImage} alt="image" className={styles.img} />
          </div>
        </div>
        <section className={styles.section}>
          <div className={styles.ProductTitle}>
            <h2 className={styles.title}>{props.name}</h2>
          </div>
          <p className={styles.rating}>
            {props.ratings}
            <span className={styles.star}>
              <StarIcon
                sx={{ color: "rgb(16, 202, 140)", backgroundColor: "#191919" }}
                fontSize="small"
              />
            </span>
          </p>
          <div className={styles.price}>
            <CurrencyRupeeIcon
              fontSize="small"
              className={styles.currencySymbol}
            />
            <h2 className={styles.offerPrice}>{props.price}</h2>
            <h2 className={styles.regularPrice}>{props.price}</h2>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default ProductCard;
