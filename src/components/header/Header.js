import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import DropDownItem from "../dropdownitems/DropDownItem";
import Menu from "../menu/Menu";
import { fetcher } from "../../helpers";
import { LoginContext, SearchText } from "../../helpers/ContextProvider";
import Box from "../box/Box";

const Header = () => {
  const [menu, setMenu] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { search, setSearch } = useContext(SearchText);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [orders, setOrders] = useState([]);
  const { isLogin, cartLength, setCartLength, address, setAddress } =
    useContext(LoginContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetcher(`ecommerce/order`)
        .then((res) => {
          setOrders(res.data);
          // console.log(orders);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, []);
  const myAddress = orders.map((order) => {
    return order.order.shipmentDetails.address;
  });
  useEffect(() => {
    setAddress(myAddress[myAddress.length - 1]);
  }, [myAddress]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetcher(`ecommerce/cart`)
        .then((res) => {
          setCartLength(res.data?.items?.length);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, [isLogin]);

  useEffect(() => {
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
        setMenu(res.data);
        // console.log(menu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      search && navigate("/products");
    }
  };

  return (
    <div className={styles.nav}>
      <Box>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Link to="/" className={styles.imgLink}>
                <img
                  src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20icon/Croma_Logo_acrkvn.svg"
                  alt="Croma"
                  className={styles.logo}
                />
              </Link>
            </div>
            <div className={styles.menuContainer}>
              <div className={styles.menu} onClick={toggleMenu}>
                <MenuIcon className={styles.menuIcon} />
                <p className={styles.text}>Menu</p>
              </div>
            </div>
            {isMenuVisible && <Menu menu={menu} />}
            <div className={styles.searchContainer}>
              <div className={styles.searchbar}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="What are you looking for ?"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <SearchIcon
                  className={styles.search_icon}
                  onClick={() => {
                    search && navigate("/products");
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.locContainer}>
              <div className={styles.locIcon}>
                <PlaceIcon fontSize="small" className={styles.place} />
              </div>
              <div>
                {address && address.city.length > 0 ? (
                  <p className={styles.location}>
                    {address.city},{address.zip}
                  </p>
                ) : (
                  <p className={styles.location}>Mohali,16005</p>
                )}
              </div>
              <div className={styles.edit}>
                <EditIcon fontSize="xtraSmall" className={styles.editIcon} />
              </div>
            </div>
            <div className={styles.userContainer}>
              <PersonIcon
                className={styles.user}
                onClick={() => setShowDropdown(!showDropdown)}
                // onMouseLeave={() => setShowDropdown(false)}
              />
            </div>
            {showDropdown && <DropDownItem />}
            <div className={styles.cartContainer}>
              <Badge
                badgeContent={token && cartLength}
                color="primary"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartIcon className={styles.cartIcon} />
              </Badge>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Header;
