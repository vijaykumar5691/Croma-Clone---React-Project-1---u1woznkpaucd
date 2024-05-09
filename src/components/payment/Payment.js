import React, { useContext, useEffect, useState } from "react";
import styles from "./Payment.module.css";
import Box from "../box/Box";
import { Link, useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import PercentIcon from "@mui/icons-material/Percent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { LoginContext } from "../../helpers/ContextProvider";
import { fetcher } from "../../helpers";

const Payment = () => {
  const { cartLength, address, addressType, mobile, fullName } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  console.log(cartItems);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetcher(`ecommerce/cart`)
        .then((res) => {
          setCartItems(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, []);

  const handlePayNow = () => {
    if (localStorage.getItem("token")) {
      fetcher(
        `ecommerce/order/convertCartToOrder
        `,
        {
          method: "POST",
          body: JSON.stringify({
            productId: `${cartItems._id}`,
            quantity: `${cartLength}`,
            addressType: `${addressType}`,
            address: {
              street: `${address.street}`,
              city: `${address.city}`,
              state: `${address.state}`,
              country: `${address.country}`,
              zipCode: `${address.zip}`,
            },
          }),
        },
        true
      );
      navigate("/myOrder");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={styles.paymentContainer}>
      <Box>
        <div className={styles.pay}>
          <p className={styles.para}>Payable amount :</p>
          <h3 className={styles.amount}>
            ₹
            {cartItems.totalPrice > 30000
              ? cartItems.totalPrice - 1000
              : cartItems.totalPrice}
          </h3>
          <button className={styles.payButton} onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.paymentHeading}>Payment</p>
            <div className={styles.paymentOption}>
              <div className={styles.first}>
                <div className={styles.optionContainer}>
                  <div className={styles.option}>
                    <PaymentIcon
                      className={styles.icon}
                      sx={{ fontSize: 42, color: "green" }}
                    />
                    <p className={styles.optionName}>Credit/Debit Cards</p>
                  </div>
                  <div className={styles.option}>
                    <PercentIcon
                      className={styles.icon}
                      sx={{ fontSize: 42, color: "green" }}
                    />
                    <p className={styles.optionName}>Pay in EMI</p>
                  </div>
                  <div className={styles.option}>
                    <CurrencyRupeeIcon
                      className={styles.icon}
                      sx={{ fontSize: 42, color: "green" }}
                    />
                    <p className={styles.optionName}>UPI</p>
                  </div>
                  <div className={styles.option}>
                    <AccountBalanceIcon
                      className={styles.icon}
                      sx={{ fontSize: 42, color: "green" }}
                    />
                    <p className={styles.optionName}>NetBanking</p>
                  </div>
                </div>
              </div>
              <div className={styles.second}>
                <div className={styles.cardSection}>
                  <h3 className={styles.cardHeading}>
                    Enter Debit/Credit Card Details
                  </h3>
                </div>
                <div className={styles.emioption}>
                  <p className={styles.emipara}>EMI Plans available</p>
                  <Link to={``} className={styles.link}>
                    View Plans
                  </Link>
                </div>
                <div className={styles.card}>
                  <label className={styles.cardNumber}>Card Number</label>
                  <input
                    className={styles.inputs}
                    type="text"
                    placeholder="Enter card number here"
                  />
                </div>
                <div className={styles.security}>
                  <div className={styles.yearContainer}>
                    <label className={styles.year}>Expiry</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className={styles.cvvContainer}>
                    <label className={styles.cvv}>CVV</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="CVV"
                    />
                  </div>
                </div>
                <button className={styles.placeOrder}>Place Order & Pay</button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.up}>
              <div className={styles.summary}>
                <h3 className={styles.summaryHeading}>Order Summary</h3>
              </div>
              <div
                className={
                  cartLength < 3 ? styles.orderDetails : styles.orderDetailed
                }
              >
                {cartItems &&
                  cartItems?.items?.map((cartItem) => {
                    return (
                      <div className={styles.prdContainer}>
                        <div className={styles.imgContainer}>
                          <img
                            src={cartItem.product.displayImage}
                            alt="image"
                            className={styles.img}
                          />
                        </div>
                        <div className={styles.productDetail}>
                          <h3 className={styles.prdHeading}>
                            {cartItem.product.name}
                          </h3>
                        </div>
                        <div className={styles.priceContainer}>
                          <h4 className={styles.price}>
                            ₹{cartItem.product.price}
                          </h4>
                          <p className={styles.quantity}>
                            Qty:{cartItem.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.shipping}>
                <h3 className={styles.shippingHeading}>Shipping Address</h3>
                <div className={styles.address}>
                  <h4 className={styles.userName}>{fullName}</h4>
                  <p className={styles.addressField}>
                    {address.street},{address.city},{address.zip},
                    {address.state},{mobile}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.downContainer}>
              <div className={styles.down}>
                <h3 className={styles.leftText}>Amount Payable</h3>
                <p className={styles.rightText}>₹{cartItems.totalPrice}</p>
              </div>
              {cartItems.totalPrice > 30000 ? (
                <div className={styles.down}>
                  <h3 className={styles.leftText}>Savings</h3>
                  <p className={styles.rightText}>- ₹1000</p>
                </div>
              ) : (
                ""
              )}
              <div className={styles.down}>
                <h3 className={styles.leftText}>Delivery charges</h3>
                <p className={styles.rightText}>Free</p>
              </div>
              {cartItems.totalPrice > 30000 ? (
                <div className={styles.down}>
                  <h3 className={styles.leftText}>Net Amount</h3>
                  <p className={styles.rightText}>
                    ₹{cartItems.totalPrice - 1000}
                  </p>
                </div>
              ) : (
                <div className={styles.down}>
                  <h3 className={styles.leftText}>Net Amount</h3>
                  <p className={styles.rightText}>₹{cartItems.totalPrice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Payment;
