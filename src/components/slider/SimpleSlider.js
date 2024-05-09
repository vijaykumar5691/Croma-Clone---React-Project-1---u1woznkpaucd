import React from "react";
import Slider from "react-slick";
import styles from "./SimpleSlider.module.css";

export default function SimpleSlider({ children }) {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {/* <div className={styles.sliderContainer}>{children}</div> */}
      {/* {children} */}
    </Slider>
  );
}

// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// const Slider = ({ children, marginTop, categoryRef, width }) => {
//   let [slide, setSlide] = useState(width);
//   const handlePrevious = () => {
//     let w = categoryRef.current.clientWidth;
//     slide = w - width;
//     setSlide(slide);
//     console.log(slide);
//   };
//   const handleNext = () => {
//     let w = categoryRef.current.clientWidth;
//     slide = w + width;
//     setSlide(slide);
//     console.log(slide);
//   };

//   return (
//     <div
//       className={styles.sliderContainer}
//       style={{ marginTop: `${marginTop}vh` }}
//     >
//       <button className={styles.leftButton} onClick={handlePrevious}>
//         <NavigateBeforeIcon fontSize="large" sx={{ color: "wheat" }} />
//       </button>
//       <div className={styles.children}>{children}</div>

//       <button className={styles.rightButton} onClick={handleNext}>
//         <NavigateNextIcon fontSize="large" sx={{ color: "wheat" }} />
//       </button>
//     </div>
//   );
// };

// export default Slider;
