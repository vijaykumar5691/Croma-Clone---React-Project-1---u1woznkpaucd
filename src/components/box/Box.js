import React from "react";
import styles from "./Box.module.css";

const Box = ({ children }) => {
  return <div className={styles.boxContainer}>{children}</div>;
};

export default Box;
