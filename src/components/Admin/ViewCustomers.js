import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function ViewCustomersAdminComponent(props) {
  const [customers, setCustomers] = useState([]);
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [decodedToken, setDecodedToken] = useState([]);

  const columns = [
    "QR Code",
    "Consumer Number",
    "Agency ID",
    "LPG ID",
    "Mobile",
    "Registration Date",
    "Registered by",
    "Worker Mobile Number",
  ];

  const options = {
    filterType: "checkbox",
  };

  useEffect(() => {
    const requestData = (async () => {
      const token = localStorage.getItem("token");
      let tempToken = decodeToken();
      setDecodedToken(tempToken);
      const url = API_URL + "/admin/view/customers";
      const headers = {
        authorization: "Bearer " + token,
        id: tempToken["sub"],
      };
      var response;
      try {
        response = await axios.get(url, { headers });
        console.log(response);
      } catch (e) {
        setMessage("Something went wrong");
        setNotificationType("error");
        setOpenNotify(true);
      }

      if (response.data.errorStatus) {
        setMessage(response.data.message);
        setNotificationType("error");
        setOpenNotify(true);
      } else {
        var tempCustomers = [];
        for (var i = 0; i < response.data.message.length; i++) {
          var element = response.data.message[i];
          var temp = [];
          for (let key in element) {
            if (key === "registration_date") {
              element[key] = Moment(element[key]).format("DD-MM-YYYY");
            }
            temp.push(element[key]);
          }
          tempCustomers.push(temp);
        }
        setCustomers(tempCustomers);
      }
    })();
  }, []);

  if (customers.length === 0) {
    return (
      <div>
        <NavbarComponent decodedToken={decodedToken} />
        <h3>No registered customers</h3>
      </div>
    );
  } else {
    return (
      <div>
        <NavbarComponent decodedToken={decodedToken} />
        <Paper>
          <MUIDataTable
            title={"Registered Customers"}
            data={customers}
            columns={columns}
            options={options}
          />
        </Paper>
        <NotificationComponent
          openNotify={openNotify}
          setOpenNotify={setOpenNotify}
          message={message}
          notificationType={notificationType}
        />
      </div>
    );
  }
}
