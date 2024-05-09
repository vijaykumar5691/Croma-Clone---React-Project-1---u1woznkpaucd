import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Box from "../../components/box/Box";
import { fetcher } from "../../helpers";
import Card from "../../components/card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../../utils";
import { categoryImage } from "../../utils";
import FavCard from "../../components/favCard/FavCard";
import { LoginContext } from "../../helpers/ContextProvider";

const Home = () => {
  const [dealProducts, setDealProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { wishListItems, setWishListItems } = useContext(LoginContext);
  const categoryRef = useRef();

  useEffect(() => {
    fetcher(
      'ecommerce/electronics/products?sort={"price":-1}',
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setDealProducts(res.data);
        // console.log(dealProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetcher(
      'ecommerce/electronics/products?sort={"rating":-1}',
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setTrendingProducts(res.data);
        // console.log(trendingProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetcher(
      'ecommerce/electronics/products?filter={"subCategory":"washingMachine"}',
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setSubCategories(res.data);
        // console.log(SubCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  var setting = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
  var bannerSetting = {
    dots: true,
    // infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };

  return (
    <div className={styles.homeContainer}>
      <Slider {...bannerSetting}>
        {images.map((image) => {
          return (
            <div key={image.id} className={styles.bannerContainer}>
              <img
                className={styles.bannerImage}
                src={image.imagePath}
                alt="banner"
              />
            </div>
          );
        })}
      </Slider>
      <Box>
        <Slider {...setting}>
          {/* <div className={styles.categoryContainer} > */}
          {categoryImage.map((category) => (
            <CategoryCard
              key={category.id}
              img={category.imagePath}
              type={category.category}
            />
          ))}
          {/* </div> */}
        </Slider>
      </Box>

      <h2 className={styles.dealHeading}>Deal of the Day </h2>
      <Box>
        <Slider {...settings}>
          {/* <div className={styles.dealProducts}> */}
          {dealProducts.map((deal) => {
            return <Card {...deal} />;
          })}
          {/* </div> */}
        </Slider>
      </Box>
      <h2 className={styles.topDealHeading}>Top Trending Deals </h2>
      <Box>
        <Slider {...settings}>
          {/* <div className={styles.topDealProducts}> */}
          {trendingProducts.map((topdeal) => {
            return <Card {...topdeal} />;
          })}
          {/* </div> */}
        </Slider>
      </Box>
      <h2 className={styles.productsByCategoryHeading}>Washing Machines</h2>
      <Box>
        <Slider {...settings}>
          {/* <div className={styles.productsByCategory}> */}
          {subCategories.map((subCategory) => {
            return <Card {...subCategory} />;
          })}
          {/* </div> */}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
