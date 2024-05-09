import React, { useEffect, useState } from "react";
import styles from "./CategoryProducts.module.css";
import { useParams } from "react-router-dom";
import Box from "../box/Box";
import { fetcher } from "../../helpers";
import ProductCard from "../productCard/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    fetcher(
      `ecommerce/electronics/products?filter={"subCategory":"${category}"}`,
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
  }, [category]);

  console.log(category);
  console.log(subCategories);
  return (
    <Box>
      <div className={styles.container}>
        <h1 className={styles.heading}>{category}</h1>
      </div>
      <div className={styles.categoryContainer}>
        {subCategories.map((subCategory) => {
          return <ProductCard {...subCategory} />;
        })}
      </div>
    </Box>
  );
};
export default CategoryProducts;
