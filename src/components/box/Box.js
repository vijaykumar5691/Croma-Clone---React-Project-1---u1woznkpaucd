import React from "react";
import styles from "./Box.module.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Box = ({ children }) => {
  return (
    <div className={styles.boxContainer}>
      {/* <NavigateBeforeIcon /> */}
      {children}
      {/* <NavigateNextIcon /> */}
    </div>
  );
};

export default Box;
