import React, { useContext, useEffect, useState } from "react";
import styles from "./Wishlists.module.css";
import Box from "../box/Box";
import { fetcher } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../helpers/ContextProvider";
import Star from "../starRating/Star";

const Wishlists = () => {
  const [wishlist, setWishlist] = useState([]);
  // const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { setCartLength } = useContext(LoginContext);
  const navigate = useNavigate();
  // console.log(wishlist);

  const handleAddToCart = (prdt) => {
    if (localStorage.getItem("token")) {
      fetcher(
        `ecommerce/cart/${prdt}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            quantity: 1,
          }),
        },
        true
      )
        .then((res) => {
          setCartLength(res.data?.items?.length);
        })
        .catch((err) => console.log(err));

      handleDeleteWishlist(prdt);
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
      )
        .then((res) => setWishlist(res.data?.items))
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetcher(`ecommerce/wishlist`)
        .then((res) => setWishlist(res.data?.items))
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Box>
      <div className={styles.wishlistContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>My Wishlist</h2>
        </div>
        {wishlist.map((wishlistItem) => {
          return (
            <div className={styles.container} key={wishlistItem.products._id}>
              <div className={styles.imgContainer}>
                <img
                  src={wishlistItem.products.displayImage}
                  alt="image"
                  className={styles.img}
                />
              </div>
              <div className={styles.prdDetailContainer}>
                <div className={styles.nameContainer}>
                  <Link
                    to={`/product/${wishlistItem.products._id}`}
                    className={styles.link}
                  >
                    <h2 className={styles.name}>
                      {wishlistItem.products.name}
                    </h2>
                  </Link>
                  <p className={styles.prdId}>
                    Product Id : {wishlistItem.products._id}
                  </p>
                </div>
                <div className={styles.priceContainer}>
                  <h3 className={styles.price}>
                    ₹ {wishlistItem.products.price}
                  </h3>
                  <p className={styles.rating}>
                    <Star
                      className={styles.starbgColor}
                      ratings={wishlistItem.products.ratings}
                    />
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addCart}
                  onClick={() => handleAddToCart(wishlistItem.products._id)}
                >
                  ADD TO CART
                </button>
                <button
                  className={styles.delete}
                  onClick={() =>
                    handleDeleteWishlist(wishlistItem.products._id)
                  }
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default Wishlists;
