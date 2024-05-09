import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./header/Header";
import LoginSignupPage from "../Pages/LoginSignupPage/LoginSignupPage";
import { Route, Routes } from "react-router-dom";
import { ContextProvider, SearchContext } from "../helpers/ContextProvider";
import Home from "../Pages/home/Home";
import Cart from "../Pages/cart/Cart";
import SingleProduct from "../Pages/singleProduct/SingleProduct";
import Products from "./products/Products";
import Footer from "./footer/Footer";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Wishlists from "./wishlist/Wishlists";
import Shipping from "./shipping/Shipping";
import MyOrder from "./myOrder/MyOrder";
import Navbar from "./navbar/Navbar";
import Payment from "./payment/Payment";
import Checkout from "./checkout/Checkout";
import CategoryProducts from "./categoryProducts/CategoryProducts";

function App() {
  return (
    <div>
      <SearchContext>
        <ContextProvider>
          <div className="App">
            {/* {path === "/chekout" || path === "/payment" ? <Navbar /> : <Header />} */}
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/categoryproducts/:category"
                element={<CategoryProducts />}
              />
              <Route path="/login" element={<LoginSignupPage />} />
              <Route
                path="/cart"
                element={<PrivateRoute element={<Cart />} />}
              />
              <Route
                path="/myOrder"
                element={<PrivateRoute element={<MyOrder />} />}
              />
              <Route
                path="/checkout"
                element={<PrivateRoute element={<Checkout />} />}
              />
              {/* <Route
                path="/payment"
                element={<PrivateRoute element={<Payment />} />}
              /> */}
              <Route
                path="/wishlist"
                element={<PrivateRoute element={<Wishlists />} />}
              />
              <Route path="/product/:productID" element={<SingleProduct />} />
            </Routes>
            <Footer />
          </div>
        </ContextProvider>
      </SearchContext>
    </div>
  );
}

export default App;
