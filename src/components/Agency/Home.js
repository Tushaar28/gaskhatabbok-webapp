import React, { useEffect, useState } from "react";

import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import ViewCustomersComponent from "./ViewCustomers";

const AgencyHomeComponent = (props) => {
  const [decodedToken, setDecodedToken] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) props.history.replace("/");
    let tempToken = decodeToken();
    setDecodedToken(tempToken);
  }, []);

  return (
    <div>
      <NavbarComponent decodedToken={decodedToken} history={props.history} />
      <h1>Home Page</h1>
    </div>
  );
};

export default AgencyHomeComponent;
