import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "./components/Layout";
import Aos from "aos";
import { cookie } from "./services";
import { getUserData } from "./store/slices/auth";
import { selectStatus } from "./store/slices/auth";
import { Loader } from "./components/UI";
// import { Wishlist } from "./components/UserAccount";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector(selectStatus);

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
      <ToastContainer />
      {/* {userStatus === "loading" ? <Loader /> : <Layout />} */}
      <Layout/>
    </div>
  );
}

export default App;
