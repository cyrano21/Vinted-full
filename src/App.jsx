import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import RoutesChild from "./RoutesChild";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [search, setSearch] = useState("");

  const setUserToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      Cookies.set("token", newToken);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        setUserToken={setUserToken}
        token={token}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setSearch={setSearch}
      />
      <RoutesChild
        setUserToken={setUserToken}
        token={token}
        search={search}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
      />
    </Router>
  );
}

export default App;
