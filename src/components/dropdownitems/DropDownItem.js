import React, { useContext } from "react";
import styles from "./DropDownItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LoginContext } from "../../helpers/ContextProvider";

const DropDownItem = (Props) => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("cartItem");
      navigate("/login");
    }
  };
  const handleLogin = () => {
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <div className={styles.dropdownitem}>
      <Link className={styles.link}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <AccountCircleOutlinedIcon
              fontSize="large"
              className={styles.icon}
              // sx={{ color: "pink" }}
            />
          </div>
          <div className={styles.headingContainer}>
            <h3 className={styles.heading}>My Profile</h3>
            <p className={styles.text}>Edit your basic details</p>
          </div>
        </div>
      </Link>
      <Link className={styles.link}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <ContactMailIcon fontSize="large" className={styles.icon} />
          </div>
          <div className={styles.headingContainer}>
            <h3 className={styles.heading}>My Address</h3>
            <p className={styles.text}>Manage your saved addresses</p>
          </div>
        </div>
      </Link>
      <Link className={styles.link} to={`/myOrder`}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <BreakfastDiningIcon fontSize="large" className={styles.icon} />
          </div>
          <div className={styles.headingContainer}>
            <h3 className={styles.heading}>My Orders</h3>
            <p className={styles.text}>
              View,track,cancle orders and buy again
            </p>
          </div>
        </div>
      </Link>
      <Link to={`/wishlist`} className={styles.link}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <FavoriteBorderIcon fontSize="large" className={styles.icon} />
          </div>
          <div className={styles.headingContainer}>
            <h3 className={styles.heading}>My Wishlist</h3>
            <p className={styles.text}>
              Have a look at your favourite products
            </p>
          </div>
        </div>
      </Link>
      <Link className={styles.link}>
        <div
          className={styles.container}
          onClick={isLogin === false ? handleLogin : handleLogout}
        >
          <div className={styles.imgContainer}>
            <PowerSettingsNewIcon fontSize="large" className={styles.icon} />
          </div>
          <div className={styles.headingContainer}>
            <h3 className={styles.heading}>
              {isLogin === true ? "Logout" : "Login"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DropDownItem;
