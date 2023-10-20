import { Routes, Route, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";
import Offer from "./Pages/Offer";
import Payment from "./Pages/Payment";
import Dashboard from "./Pages/Dashboard";
import UpdateOffer from "./Pages/UpdateOffer";
import DeleteOffer from "./Pages/DeleteOffer";

const RoutesChild = ({
  setUserToken,
  token,
  fetchRangeValues,
  sortPrice,
  search,
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fade-in");
  console.log("location =>", location);
  console.log("displayLocation =>", displayLocation);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fade-out");
    }
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fade-out") {
          setTransitionStage("fade-in");
          setDisplayLocation(location);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route
          path="/"
          element={
            <Home
              fetchRangeValues={fetchRangeValues}
              sortPrice={sortPrice}
              search={search}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard token={token} />} // Passez le jeton à la page Dashboard
        />
        <Route
          path="/signup"
          element={<Signup setUserToken={setUserToken} />}
        />
        <Route path="/login" element={<Login setUserToken={setUserToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/update/offer/:id" element={<UpdateOffer />} />
        <Route path="/offer/delete/:id" element={<DeleteOffer />} />
      </Routes>
    </div>
  );
};

export default RoutesChild;
