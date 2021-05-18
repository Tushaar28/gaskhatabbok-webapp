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
      <NavbarComponent decodedToken={decodedToken} />
      <ViewCustomersComponent decodedToken={decodedToken} />
    </div>
  );
};

export default AgencyHomeComponent;
