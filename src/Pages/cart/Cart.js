import React, { useState, useEffect, useContext } from "react";
import styles from "./Cart.module.css";
import Box from "../../components/box/Box";
import { fetcher } from "../../helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../helpers/ContextProvider";
import StarIcon from "@mui/icons-material/Star";

const Cart = () => {
  const [cartItems, setCartItems] = useState({});
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [showShipping, setShowShipping] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cartLength, setCartLength } = useContext(LoginContext);

  useEffect(() => {
    if (token) {
      fetcher(`ecommerce/cart`)
        .then((res) => {
          setCartItems(res.data);
          setCartLength(res.data?.items?.length);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, []);

  const handleRemoveCartItem = (id) => {
    if (token) {
      fetcher(
        `ecommerce/cart/${id}`,
        {
          method: "DELETE",
        },
        true
      )
        .then((res) => {
          setCartItems(res.data);
          setCartLength(res.data?.items?.length);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };

  const handleMovingWishlist = (pid) => {
    if (token) {
      fetcher(
        `ecommerce/wishlist`,
        {
          method: "PATCH",
          body: JSON.stringify({
            productId: `${pid}`,
          }),
        },
        true
      );
      // .then((res) => setWishlist(res.data?.items))
      // .catch((err) => console.log(err));
      handleRemoveCartItem(pid);
    } else {
      navigate("/login");
    }
  };

  const handleCheckout = () => {
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <Box>
        <div className={styles.cartContainer}>
          <div className={styles.cartHeading}>
            <h2 className={styles.heading}>YOUR CART</h2>
          </div>
          {cartLength > 0 ? (
            <div className={styles.productContainer}>
              <div className={styles.leftContainer}>
                {cartItems &&
                  cartItems?.items?.map((cartItem) => {
                    return (
                      <div key={cartItem.product._id} className={styles.left}>
                        <Link
                          to={`/product/${cartItem.product._id}`}
                          className={styles.link}
                        >
                          <div className={styles.imageContainer}>
                            <img
                              src={cartItem.product.displayImage}
                              alt="image"
                              className={styles.prdPic}
                            />
                          </div>
                        </Link>
                        <div className={styles.prdContainer}>
                          <div className={styles.produtNameContainer}>
                            <h2 className={styles.productName}>
                              {cartItem.product.name}
                            </h2>
                            <p className={styles.rating}>
                              {cartItem.product.ratings}
                              <span className={styles.star}>
                                <StarIcon
                                  className={styles.star}
                                  sx={{
                                    color: "rgb(16, 202, 140)",
                                    backgroundColor: "white",
                                  }}
                                  fontSize="small"
                                />
                              </span>
                            </p>
                          </div>
                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.button}
                              onClick={() =>
                                handleMovingWishlist(cartItem.product._id)
                              }
                            >
                              Move to Wishlist
                            </button>
                            <button
                              className={styles.button}
                              onClick={() =>
                                handleRemoveCartItem(cartItem.product._id)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className={styles.prdPriceContainer}>
                          <h3
                            className={styles.prdPrice}
                          >{`₹ ${cartItem.product.price}`}</h3>
                          <p className={styles.text}>(Incl. all Taxes)</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.right}>
                <div className={styles.summaryContainer}>
                  <h3 className={styles.summaryHeading}>
                    {`Order Summary ( ${cartItems?.items?.length} items )`}
                  </h3>
                </div>
                <div className={styles.priceContainer}>
                  <p className={styles.priceText}>Original Price</p>
                  <p className={styles.price}>{`₹${cartItems.totalPrice}`}</p>
                </div>
                {cartItems.totalPrice > 30000 ? (
                  <div className={styles.savingContainer}>
                    <p className={styles.savingText}>Savings</p>
                    <p className={styles.saving}>{`₹1000`}</p>
                  </div>
                ) : (
                  ""
                )}

                <div className={styles.deliveryContainer}>
                  <p className={styles.deliveryText}>Delivery</p>
                  <p className={styles.delivery}>{`Free`}</p>
                </div>
                <div className={styles.totalContainer}>
                  <p className={styles.totalText}>Original Total</p>
                  {cartItems.totalPrice > 30000 ? (
                    <p className={styles.total}>{`₹${
                      cartItems.totalPrice - 1000
                    }`}</p>
                  ) : (
                    cartItems.totalPrice
                  )}
                </div>
                <button className={styles.checkout} onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            "CART IS EMPTY"
          )}
        </div>
      </Box>
    </div>
  );
};

export default Cart;
