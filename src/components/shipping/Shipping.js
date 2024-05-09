import React, { useContext, useEffect, useState } from "react";
import styles from "./Shipping.module.css";
import Box from "../box/Box";
import { useNavigate } from "react-router-dom";
import ShipingForm from "../shipingform/ShipingForm";
import { fetcher } from "../../helpers";
import { LoginContext } from "../../helpers/ContextProvider";

const Shipping = ({ setTab }) => {
  const navigate = useNavigate();
  const {
    cartLength,
    address,
    setAddress,
    addressType,
    setAddressType,
    mobile,
    setMobile,
    fullName,
    setFullName,
  } = useContext(LoginContext);
  const [cartItems, setCartItems] = useState({});
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [message, setMessage] = useState("");
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
  const handleAddress = (e) => {
    const newAddress = { ...address };
    newAddress[e.target.name] = e.target.value;
    setAddress(newAddress);
    // console.log(address);
  };
  // console.log(addressType);

  const handleForm = () => {
    setShowShippingForm(true);
  };
  const ProceedToPayment = () => {
    if (localStorage.getItem("token")) {
      if (address.city === "" && address.zip === "") {
        alert("Please add your Address");
      } else {
        setTab("payment");
      }
    } else {
      navigate("/login");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !fullName &&
      !mobile &&
      !addressType &&
      !address.city &&
      !address.street &&
      !!address.state &&
      !address.country &&
      !address.zip
    ) {
      setMessage("All fields are Mandatory");
    } else if (fullName.length <= 3) {
      setMessage("Enter valid Name");
    } else if (mobile.length <= 10) {
      setMessage("Enter valid Mobile Number");
    } else if (!address.city) {
      setMessage("Enter city Name");
    } else if (!address.street) {
      setMessage("Enter street Name");
    } else if (!address.state) {
      setMessage("Enter city Name");
    } else if (!address.country) {
      setMessage("Enter city Name");
    } else if (!address.zip) {
      setMessage("Enter pincode");
    } else {
      setAddress(address);
      setFullName(fullName);
      setAddressType(addressType);
      setMobile(mobile);
      setTab("payment");
    }
  };

  return (
    <div className={styles.container}>
      <Box>
        {showShippingForm === true ? (
          <div className={styles.formContainer}>
            <div
              className={styles.close}
              onClick={() => setShowShippingForm(false)}
            >
              X
            </div>
            <p className={styles.addressDetail}>Address Details</p>
            <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
              <div className={styles.fieldContainer}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className={styles.input}
                    name="name"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Mobile Number </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className={styles.input}
                    name="mobile"
                    onChange={(e) => setMobile(Number(e.target.value))}
                    value={mobile}
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <div className={styles.field}>
                  <label className={styles.label}>City</label>
                  <input
                    type="text"
                    placeholder="Enter City Name"
                    className={styles.input}
                    name="city"
                    onChange={(e) => handleAddress(e)}
                    value={address.city}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>PinCode</label>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className={styles.input}
                    name="zip"
                    onChange={(e) => handleAddress(e)}
                    value={Number(address.zip)}
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Address (Flat no., Building, Company, Street){" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Full Address"
                    className={styles.inputAddress}
                    name="street"
                    onChange={(e) => handleAddress(e)}
                    value={address.street}
                  />
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <div className={styles.field}>
                  <label className={styles.label}>State</label>
                  <input
                    type="text"
                    placeholder="Enter State Name"
                    className={styles.input}
                    name="state"
                    onChange={(e) => handleAddress(e)}
                    value={address.state}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter Country"
                    className={styles.input}
                    onChange={(e) => handleAddress(e)}
                    value={address.country}
                  />
                </div>
              </div>
              <div className={styles.adddressType}>
                <div className={styles.type}>Address Type</div>
                <input
                  type="radio"
                  id="home"
                  name="type"
                  value="HOME"
                  onChange={(e) => setAddressType(e.target.value)}
                />
                <label htmlFor="home" className={styles.label}>
                  Home
                </label>
                <input
                  type="radio"
                  id="work"
                  name="type"
                  value="WORK"
                  onChange={(e) => setAddressType(e.target.value)}
                />
                <label className={styles.label} htmlFor="work">
                  Work
                </label>
                <input
                  type="radio"
                  id="other"
                  name="type"
                  value="OTHER"
                  onChange={(e) => setAddressType(e.target.value)}
                />
                <label className={styles.label} htmlFor="other">
                  Other
                </label>
              </div>
              <div className={styles.messageContainer}>
                {message.length > 0 ? (
                  <p className={styles.message}>" {message} "</p>
                ) : (
                  ""
                )}
              </div>
              <input
                className={styles.submit}
                type="submit"
                value="Save & Continue"
              />
            </form>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <div className={styles.cartHeading}>
              <h3 className={styles.heading}>ENTER SHIPPING INFORMATION </h3>
            </div>
            <button className={styles.addAddress} onClick={handleForm}>
              {showShippingForm === false ? "Add Address" : ""}
            </button>
            {showShippingForm && <ShipingForm />}
            <h3 className={styles.delivery}>Delivery Options</h3>
            <div className={styles.productContainer}>
              <div className={styles.left}>
                {cartItems &&
                  cartItems?.items?.map((cartItem) => {
                    return (
                      <div key={cartItem.product._id} className={styles.prdts}>
                        <div className={styles.imageContainer}>
                          <img
                            src={cartItem.product.displayImage}
                            alt="image"
                            className={styles.prdPic}
                          />
                        </div>
                        <div className={styles.prdContainer}>
                          <h3 className={styles.prdName}>
                            {cartItem.product.name}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.right}>
                <div className={styles.summaryContainer}>
                  <h3 className={styles.summaryHeading}>
                    {`Order Summary ( ${cartLength} items )`}
                  </h3>
                </div>
                <div className={styles.priceContainer}>
                  <p className={styles.priceText}>Original Price</p>
                  <p className={styles.price}>{`₹${cartItems.totalPrice}`}</p>
                </div>
                {cartItems.totalPrice > 30000 ? (
                  <div className={styles.savingContainer}>
                    <p className={styles.savingText}>Savings</p>
                    <p className={styles.saving}>{`₹1000`}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.deliveryContainer}>
                  <p className={styles.deliveryText}>Delivery</p>
                  <p className={styles.delivery}>Free</p>
                </div>
                {cartItems.totalPrice > 30000 ? (
                  <div className={styles.totalContainer}>
                    <p className={styles.totalText}>Original Total</p>
                    <p className={styles.total}>{`₹${
                      cartItems.totalPrice - 1000
                    }`}</p>
                  </div>
                ) : (
                  <div className={styles.totalContainer}>
                    <p className={styles.totalText}>Original Total</p>
                    <p className={styles.total}>{`₹${cartItems.totalPrice}`}</p>
                  </div>
                )}
                <button className={styles.checkout} onClick={ProceedToPayment}>
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Shipping;
