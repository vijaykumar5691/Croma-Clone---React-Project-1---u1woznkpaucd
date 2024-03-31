import "../styles/App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Header from "./header/Header";
import LoginSignupPage from "../Pages/LoginSignupPage/LoginSignupPage";
import { Route, Routes } from "react-router-dom";
import { Home } from "@mui/icons-material";
import { ContextProvider } from "../helpers/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignupPage />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
