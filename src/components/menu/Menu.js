import React from "react";
import styles from "./Menu.module.css";
import Box from "../box/Box";

const Menu = ({ menu }) => {
  console.log(menu);
  return (
    <div className={styles.menuContainer}>
      <h3 className={styles.menuHeading}>Shop by Category</h3>
      <ul className={styles.menuDropdown}>
        <Box>
          {menu.map((item, i) => {
            return (
              <li key={i} className={styles.menuItem}>
                {item}
              </li>
            );
          })}
        </Box>
      </ul>
    </div>
  );
};

export default Menu;
