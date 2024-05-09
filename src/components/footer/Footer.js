import React from "react";
import styles from "./Footer.module.css";
import Box from "../box/Box";
import EastIcon from "@mui/icons-material/East";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Box>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.leftHeadingContainer}>
              <h3 className={styles.leftHeading}>CONNECT WITH US</h3>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="email"
                placeholder="Enter Email ID"
                className={styles.input}
              />
              <div className={styles.icon}>
                <EastIcon className={styles.arrow} />
              </div>
            </div>
            <div className={styles.iconContainer}>
              <Link className={styles.tubeContainer}>
                <SmartDisplayOutlinedIcon className={styles.tubeIcon} />
              </Link>
              <Link className={styles.facebookContainer}>
                <FacebookOutlinedIcon className={styles.facebookIcon} />
              </Link>
              <Link className={styles.instaContainer}>
                <InstagramIcon className={styles.instaIcon} />
              </Link>
              <Link className={styles.twitterContainer}>
                <TwitterIcon className={styles.twitterIcon} />
              </Link>
            </div>
            <div className={styles.copyrights}>
              <p className={styles.copyrightsText}>
                © Copyright 2023 Croma. All rights reserved
              </p>
            </div>
          </div>
          <div className={styles.middleContainer}>
            <h3 className={styles.usefulLinks}>USEFUL LINKS</h3>
            <div className={styles.linksContainer}>
              <div className={styles.first}>
                <Link className={styles.link}>About Croma</Link>
                <Link className={styles.link}>Help And Support</Link>
                <Link className={styles.link}>FAQs</Link>
                <Link className={styles.link}>Buying Guide</Link>
                <Link className={styles.link}>Return Policy</Link>
                <Link className={styles.link}>B2B Orders</Link>
                <Link className={styles.link}>Store Locator</Link>
                <Link className={styles.link}>E-Waste</Link>
              </div>
              <div className={styles.second}>
                <Link className={styles.link}>Franchise</Link>
                <Link className={styles.link}>Site Map</Link>
                <Link className={styles.link}>Careers At Croma</Link>
                <Link className={styles.link}>Terms Of Use</Link>
                <Link className={styles.link}>Disclaimer</Link>
                <Link className={styles.link}>Privacy Policy</Link>
                <Link className={styles.link}>Unboxed</Link>
                <Link className={styles.link}>Gift Card</Link>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <h3 className={styles.usefulLinks}>PRODUCTS</h3>
            <div className={styles.linksContainer}>
              <div className={styles.one}>
                <Link className={styles.link}>Televisions</Link>
                <Link className={styles.link}>Home Appliances</Link>
                <Link className={styles.link}>Phones & Wearables</Link>
                <Link className={styles.link}>Computers & Tablets</Link>
                <Link className={styles.link}>Kitchen Appliances</Link>
                <Link className={styles.link}>Audio & Video</Link>
                <Link className={styles.link}>Health & fitness</Link>
              </div>
              <div className={styles.two}>
                <Link className={styles.link}>Personal Care</Link>
                <Link className={styles.link}>Cameras</Link>
                <Link className={styles.link}>Smart Devices</Link>
                <Link className={styles.link}>Gaming</Link>
                <Link className={styles.link}>Accessories</Link>
                <Link className={styles.link}>Top Brands</Link>
                <Link className={styles.link}></Link>
                <Link className={styles.link}></Link>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Footer;
