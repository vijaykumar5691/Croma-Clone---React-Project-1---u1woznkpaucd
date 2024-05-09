import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Products.module.css";
import ProductCard from "../productCard/ProductCard";
import Box from "../box/Box";
import { SearchText } from "../../helpers/ContextProvider";
import { fetcher } from "../../helpers";
import { useDebounce } from "use-debounce";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const { search, setSearch } = useContext(SearchText);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  // console.log(brand);
  // console.log(category);
  // console.log(seller);
  // console.log(sort);

  let categories = new Set();
  searchProducts.map((c) => {
    categories.add(c.subCategory);
  });
  let newCategories = Array.from(categories);

  let brands = new Set();
  searchProducts.map((b) => {
    brands.add(b.brand);
  });
  let newBrand = Array.from(brands);

  let sellers = new Set();
  searchProducts.map((s) => {
    sellers.add(s.sellerTag);
  });
  let newSellers = Array.from(sellers);

  useEffect(() => {
    fetcher(
      `ecommerce/electronics/products`,
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setProducts(res.data);
        // console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetcher(
      `ecommerce/electronics/products?filter=
      {"subCategory":"${category}","brand":"${brand}","sellerTag": "${seller}"}`,
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setFilters(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, brand, seller]);

  useEffect(() => {
    fetcher(
      `ecommerce/electronics/products?search={"name":"${search}"}`,
      {
        method: "GET",
        Headers: {
          projectId: "b4j0aeyd1jd1",
        },
      },
      false
    )
      .then((res) => {
        setSearchProducts(res.data);
        setFilters();
        // console.log(searchProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetcher(
          `ecommerce/electronics/products?limit=10&page=${page}`,
          {
            method: "GET",
            Headers: {
              projectId: "b4j0aeyd1jd1",
            },
          },
          false
        )
          .then((res) => {
            setProducts((prevPrd) => [...prevPrd, ...res.data]);
            setPage((prev) => prev + 1);
            // console.log(products);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, page]);

  const searchedTerm =
    searchProducts &&
    searchProducts.filter((prd, id) => {
      return prd.name.toLowerCase().includes(search.toLowerCase());
    });

  // useEffect(() => {
  //   if (sort === "Price(Low-High)") {
  //     fetcher(
  //       `ecommerce/electronics/products?sort=
  //     {"price":-1}}`,
  //       {
  //         method: "GET",
  //         Headers: {
  //           projectId: "b4j0aeyd1jd1",
  //         },
  //       },
  //       false
  //     )
  //       .then((res) => {
  //         setFilters(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else if (sort === "Price(High-Low)") {
  //     fetcher(
  //       `ecommerce/electronics/products?sort=
  //     {"price":1}}`,
  //       {
  //         method: "GET",
  //         Headers: {
  //           projectId: "b4j0aeyd1jd1",
  //         },
  //       },
  //       false
  //     )
  //       .then((res) => {
  //         setFilters(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [sort]);

  return (
    <Box>
      <div className={styles.products}>
        <h2 className={styles.results}>Results for "{search}"</h2>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.dropdownContainer}>
              <select
                className={styles.optionContainer}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="category">Categories</option>
                {newCategories.map((item, i) => {
                  return <option key={i}>{item}</option>;
                })}
              </select>
            </div>
            <div className={styles.dropdownContainer}>
              <select
                className={styles.optionContainer}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="brand">Brand</option>
                {newBrand.map((item, i) => {
                  return <option key={i}>{item}</option>;
                })}
              </select>
            </div>
            <div className={styles.dropdownContainer}>
              <select
                className={styles.optionContainer}
                onChange={(e) => setSeller(e.target.value)}
              >
                <option value="seller">Seller Tag</option>
                {newSellers.map((item, i) => {
                  return <option key={i}>{item}</option>;
                })}
              </select>
            </div>
          </div>
          <div className={styles.secondContainer}>
            <select
              className={styles.options}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Sort By</option>
              <option>Top Rated</option>
              <option>Price(Low-High)</option>
              <option>Price(High-Low)</option>
            </select>
          </div>
        </section>
      </div>
      <div className={styles.productsContainer}>
        {search === "" ? (
          <div className={styles.prdCardContainer}>
            {products.map((prd) => {
              return <ProductCard {...prd} />;
            })}
            <div ref={containerRef}></div>
          </div>
        ) : (
          <div className={styles.prdCardContainer}>
            {!filters
              ? searchedTerm &&
                searchedTerm.map((prd) => {
                  return <ProductCard {...prd} />;
                })
              : filters &&
                filters.map((prd) => {
                  return <ProductCard {...prd} />;
                })}
          </div>
        )}
      </div>
    </Box>
  );
};

export default Products;

// const products = [

//   {seller: 'chroma', brand:'apple', category: 'electronics'},

//   {seller: 'chroma2', brand:'apple2', category: 'electronics2'},

//   {seller: 'chroma3', brand:'apple3', category: 'electronics3'},

//   {seller: 'chroma', brand:'apple', category: 'electronics'},

//   {seller: 'chroma2', brand:'apple2', category: 'electronics2'},

//   {seller: 'chroma3', brand:'apple3', category: 'electronics3'}

//   ];

//   let categories = new Set();

//   // Adding values to the Set

//   products.map((c) => {

//   categories.add(c.category);

//   })

//   let newArray = Array.from(categories);

//   console.log("Array created from Set:", newArray);

//   // console.log(categories);

// {!filters
//   ? searchedTerm &&
//     searchedTerm.map((prd) => {
//       return <ProductCard {...prd} />;
//     })
//   : filters &&
//     filters.map((prd) => {
//       return <ProductCard {...prd} />;
//     })}
