import React, { useState } from "react";
import styles from "./ShipingForm.module.css";

const ShipingForm = () => {
  const [show, setShow] = useState(true);
  const [addressType, setAddressType] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const handleAddress = (e) => {
    const newAddress = { ...address };
    newAddress[e.target.name] = e.target.value;
    setAddress(newAddress);
    // console.log(address);
  };
  // console.log(addressType);
  return (
    <>
      {show === true ? (
        <div className={styles.formContainer}>
          <div className={styles.close} onClick={() => setShow(false)}>
            X
          </div>
          <p className={styles.addressDetail}>Address Details</p>
          <form className={styles.form}>
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
                  onChange={(e) => setMobile(e.target.value)}
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
                  value={address.zip}
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
                value="Home"
                onChange={(e) => setAddressType(e.target.value)}
              />
              <label htmlFor="home" className={styles.label}>
                Home
              </label>
              <input
                type="radio"
                id="work"
                name="type"
                value="Work"
                onChange={(e) => setAddressType(e.target.value)}
              />
              <label className={styles.label} htmlFor="work">
                Work
              </label>
              <input
                type="radio"
                id="other"
                name="type"
                value="Other"
                onChange={(e) => setAddressType(e.target.value)}
              />
              <label className={styles.label} htmlFor="other">
                Other
              </label>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShipingForm;
