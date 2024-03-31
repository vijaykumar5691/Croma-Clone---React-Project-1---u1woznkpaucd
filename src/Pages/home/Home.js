import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import Box from "../../components/box/Box";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(
    () =>
      fetcher(
        "ecommerce/electronics/products",
        {
          method: "GET",
          Headers: {
            projectId: "b4j0aeyd1jd1",
          },
        },
        false
      )
        .then((res) => {
          setProduct(res.data);
          console.log(product);
        })
        .catch((err) => {
          console.log(err);
        }),
    []
  );
  useEffect(
    () =>
      fetcher(
        "ecommerce/electronics/categories",
        {
          method: "GET",
          Headers: {
            projectId: "b4j0aeyd1jd1",
          },
        },
        false
      )
        .then((res) => {
          setCategories(res.data);
          console.log(categories);
        })
        .catch((err) => {
          console.log(err);
        }),
    []
  );

  return (
    <div className={styles.home}>
      <Box>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryCard img={category.image} type={category.type} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Home;
