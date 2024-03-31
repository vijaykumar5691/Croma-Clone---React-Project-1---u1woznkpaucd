import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
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

const Header = () => {
  const [menu, setMenu] = useState([]);
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

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            className="chroma_logo"
            src="assets/chroma_logo.png"
            width={150}
            height={35}
            alt="Logo"
          />
        </Link>
      </div>
      <div className={styles.menu} onClick={() => <Menu menu={menu} />}>
        <MenuIcon />
        <p>Menu</p>
      </div>
      <div className={styles.searchbar}>
        <input
          className={styles.search}
          type="text"
          placeholder="What are you looking for ?"
        />
        <SearchIcon className={styles.search_icon} />
      </div>
      <div className={styles.container}>
        <div className={styles.loc_container}>
          <span>
            <PlaceIcon fontSize="small" />
          </span>
          <span>Mohali,</span>
          <span>16005</span>
          <span>
            <EditIcon fontSize="xtraSmall" />
          </span>
        </div>
        <div className={styles.profile}>
          <span className={styles.profile_icon}>
            <PersonIcon
              onMouseEnter={() => <DropDownItem />}
              onMouseLeave={() => null}
            />
          </span>
        </div>
        <div className={styles.cart_container}>
          <Badge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
