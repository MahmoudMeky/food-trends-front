import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import {
  Home,
  ContactUs,
  AboutUs,
  Cart,
  UserAcount,
  ProductPage,
} from "./routes";
import { Routes, Route } from "react-router-dom";
import Aos from "aos";
import { cookie } from "./services";
import { getUserData } from "./store/slices/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = cookie.getCookie("token");
    if (token) {
      dispatch(getUserData(token));
    }
  }, []);
  // Initiate Animation
  Aos.init({
    once: "true",
  });

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/contact-us"} element={<ContactUs />} />
          <Route path={"/about"} element={<AboutUs />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/user-account"} element={<UserAcount />} />
          <Route path={"/shop/:id"} element={<ProductPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
