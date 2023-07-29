import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Offer from "./Pages/Offer/Offer";
import Header from "./components/Header/Header";
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import SignIn from "./Pages/SignIn/SignIn";
import Publish from "./Pages/Publish/Publish";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token" || ""));
  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route
          path="/signup"
          element={<Signup setUserToken={setUserToken} />}
        ></Route>
        <Route
          path="/signin"
          element={<SignIn setUserToken={setUserToken} />}
        ></Route>
        <Route
          path="/publish"
          element={<Publish setUserToken={setUserToken} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
