import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Shipping from "../shipping/Shipping";
import Payment from "../payment/Payment";

const Navbar = () => {
  const [tab, setTab] = useState("shipping");
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.NavbarContainer}>
        <div className={styles.imgContainer}>
          <Link to="/" className={styles.imgLink}>
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20icon/Croma_Logo_acrkvn.svg"
              alt="Croma"
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cart} onClick={() => navigate("/cart")}>
            Cart
          </button>
          <button
            className={
              tab === "shipping" ? styles.activeShipping : styles.shipping
            }
            onClick={() => setTab("shipping")}
          >
            Shipping
          </button>
          <button
            disabled
            className={
              tab === "payment" ? styles.activePayment : styles.payment
            }
            onClick={() => setTab("payment")}
          >
            Payment
          </button>
        </div>
      </div>
      {tab === "shipping" ? (
        <div className={styles.shippingContainer}>
          <Shipping setTab={setTab} />
        </div>
      ) : (
        <div className={styles.paymentContainer}>
          <Payment />
        </div>
      )}
    </div>
  );
};

export default Navbar;
