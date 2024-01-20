import React from "react";

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
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
      <div className={styles.menu}>
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
            <PersonIcon />
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
