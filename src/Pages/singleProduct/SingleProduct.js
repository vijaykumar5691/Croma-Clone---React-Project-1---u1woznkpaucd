import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./SingleProduct.module.css";
import Slider from "react-slick";
import { fetcher } from "../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/box/Box";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { LoginContext } from "../../helpers/ContextProvider";
import StarIcon from "@mui/icons-material/Star";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
  // const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [features, setFeatures] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { productID } = useParams();
  const navigate = useNavigate();
  const { setCartLength } = useContext(LoginContext);
  const token = localStorage.getItem("token");

  const handleImage = (pic) => {
    setProductImage(pic);
  };

  const handleCart = (prdt) => {
    console.log(prdt);
    if (token) {
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
    } else {
      navigate("/login");
    }
  };
  const handleBuyNow = (id) => {
    if (token) {
      fetcher(
        `ecommerce/cart/${id}`,
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
          navigate("/checkout");
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };
  const handleWishlist = (prd) => {
    console.log(prd);
    if (token) {
      fetcher(
        `ecommerce/wishlist`,
        {
          method: "PATCH",
          // Headers: {
          //   Authorization: "Bearer " + token,
          //   projectId: "b4j0aeyd1jd1",
          // },
          body: JSON.stringify({
            productId: `${prd}`,
          }),
        },
        true
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetcher(
      `ecommerce/review/${productID}`,
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setReviews(res.data);
        // console.log(reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetcher(
      `ecommerce/product/${productID}`,
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setSingleProduct(res.data);
        setImages(res.data.images);
        setFeatures(res.data.features);
        // console.log(singleProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    vertical: true,
    focusOnSelect: true,
  };

  return (
    <>
      <Box>
        <div className={styles.singleProduct}>
          <div className={styles.firstContainer}>
            <div className={styles.sliderContainer}>
              <Slider {...settings} className={styles.Slider}>
                {images &&
                  images.map((picture, i) => {
                    return (
                      <div key={i} className={styles.slideImgContainer}>
                        <img
                          onClick={() => handleImage(picture)}
                          src={picture}
                          alt="slideImage"
                          className={styles.slideImg}
                        />
                      </div>
                    );
                  })}
                <div
                  key={singleProduct._id}
                  className={styles.slideImgContainer}
                >
                  <img
                    src={
                      productImage === ""
                        ? singleProduct.displayImage
                        : productImage
                    }
                    alt="slideImage"
                    className={styles.slideImg}
                  />
                </div>
                {/* <div key={singleProduct.id} className={styles.slideImgContainer}>
                <img
                  src={singleProduct.videos}
                  alt="slideVideos"
                  className={styles.slideImg}
                />
              </div> */}
              </Slider>
            </div>
            <div className={styles.container}>
              <div className={styles.favContainer}>
                <FavoriteBorderOutlinedIcon
                  className={styles.favIcon}
                  onClick={() => handleWishlist(singleProduct._id)}
                />
              </div>
              <div className={styles.imgContainer}>
                <img
                  src={
                    productImage === ""
                      ? singleProduct.displayImage
                      : productImage
                  }
                  alt="slideImage"
                  className={styles.img}
                />
              </div>
            </div>
          </div>
          <div className={styles.secondContainer}>
            <div className={styles.headingContainer}>
              <h2 className={styles.heading}>{singleProduct.name}</h2>
            </div>
            <div className={styles.ratingContainer}>
              <p className={styles.rating}>
                {singleProduct.ratings}
                <span className={styles.star}>
                  <StarIcon
                    sx={{
                      color: "rgb(16, 202, 140)",
                      backgroundColor: "#191919",
                    }}
                    fontSize="small"
                  />
                </span>
              </p>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.currencyContainer}>
                <CurrencyRupeeIcon className={styles.currencySymbol} />
                <h3 className={styles.price}>{singleProduct.price}</h3>
              </div>
              <p className={styles.taxText}>(Incl. all Taxes)</p>
            </div>
            <div className={styles.featureContainer}>
              <h4 className={styles.keyFeatures}>Key Features</h4>
              {features.map((feature, i) => {
                return (
                  <ul key={i} className={styles.features}>
                    <li className={styles.featureItem}>{feature}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.overviewContainer}>
          <div className={styles.overviews}>
            <h4 className={styles.overviewHeading}>Overview</h4>
            <p className={styles.description}>{singleProduct.description}</p>
            <div className={styles.customerRatingContainer}>
              <h4 className={styles.customerRating}>Customer Rating</h4>
              <div className={styles.prdRating}>
                {singleProduct.ratings}
                <span className={styles.star}>
                  <StarIcon
                    sx={{
                      color: "rgb(16, 202, 140)",
                      backgroundColor: "#191919",
                    }}
                    fontSize="small"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <div className={styles.bottomNav}>
        <div className={styles.left}>
          <img
            className={styles.prdImg}
            src={singleProduct.displayImage}
            alt="productImage"
          />
          <h3 className={styles.prdName}>{singleProduct.name}</h3>
        </div>
        <div className={styles.right}>
          <button
            className={styles.buy}
            onClick={() => handleBuyNow(singleProduct._id)}
          >
            Buy Now
          </button>
          <button
            className={styles.addCart}
            onClick={() => handleCart(singleProduct._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
