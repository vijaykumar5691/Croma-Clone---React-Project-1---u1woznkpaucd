import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import Box from "../box/Box";
import { fetcher } from "../../helpers";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetcher(`ecommerce/order`)
        .then((res) => {
          setOrders(res.data);
          // console.log(orders);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Box>
      <div className={styles.ordersContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>My Orders</h2>
        </div>
        {orders?.length > 0 ? (
          <div className={styles.allOrderContainer}>
            {orders?.map((ordered) => {
              return ordered?.order?.items.map((order) => {
                return (
                  <div key={order.product._id} className={styles.allOrder}>
                    <div className={styles.orderIdContainer}>
                      <h4 className={styles.orderId}>
                        Order Id: {ordered.order._id}
                      </h4>
                    </div>
                    <div className={styles.productsContainer}>
                      <div className={styles.imageContainer}>
                        <img
                          className={styles.image}
                          src={order?.product.displayImage}
                          alt="image"
                        />
                      </div>
                      <div className={styles.prodoductHeading}>
                        <h4 className={styles.productName}>
                          {order?.product.name}
                        </h4>
                        <p className={styles.prdId}>
                          Product Id: {order?.product._id}
                        </p>
                        <h4 className={styles.price}>
                          ₹ {order?.product.price}
                        </h4>
                        <p className={styles.date}>
                          Purched on {ordered?.createdAt?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className={styles.buttonsContainer}>
                      <button className={styles.buttons}>CANCEL ORDER</button>
                      <button className={styles.buttons}>
                        TRACK YOUR ORDER
                      </button>
                    </div>
                  </div>
                );
              });
            })}
            <button className={styles.shopMore} onClick={() => navigate("/")}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className={styles.emptyOrder}>
            <div className={styles.imgContainer}>
              <img
                className={styles.img}
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets/sshz69afrixwivcsgnpx.svg"
                alt="image"
              />
            </div>
            <div className={styles.messageContainer}>
              <h3 className={styles.message}>No Order History Available</h3>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => navigate("/")}>
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default MyOrder;
