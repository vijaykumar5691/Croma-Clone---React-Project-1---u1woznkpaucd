import React from "react";
import styles from "./DropDownItem.module.css";

const DropDownItem = (Props) => {
  return (
    <li className={styles.dropdownitem}>
      {/* <img></img> */}
      <a>{Props.item}</a>
    </li>
  );
};

export default DropDownItem;
