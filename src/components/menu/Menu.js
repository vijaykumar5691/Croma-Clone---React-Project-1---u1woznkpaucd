import React from "react";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";

const Menu = ({ menu }) => {
  // console.log(menu);
  return (
    <div className={styles.menuContainer}>
      <h3 className={styles.menuHeading}>Shop by Category</h3>
      <ul className={styles.menuDropdown}>
        {menu.map((item, i) => {
          return (
            <Link to={`/categoryproducts/${item}`} className={styles.link}>
              <li key={i} className={styles.menuItem}>
                {item.toUpperCase()}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
