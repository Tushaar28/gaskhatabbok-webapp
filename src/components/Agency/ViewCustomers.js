import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Moment from 'moment';
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

const ViewCustomersComponent = (props) => {
  const { history } = props;
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
    "Alternate Mobile Number",
    "Registration Date",
    "Registered by",
    "Worker Mobile Number",
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              color="primary"
              onClick={() => {
                history.push({
                  pathname: '/agency/home/customer/edit',
                  state: {
                    qr_code_id: tableMeta.rowData[0],
                    consumer_number: tableMeta.rowData[1],
                    agency_id: tableMeta.rowData[2],
                    lpg_id: tableMeta.rowData[3],
                    mobile: tableMeta.rowData[4],
                    registration_date: tableMeta.rowData[5],
                    registered_by: tableMeta.rowData[6],
                    worker_mobile_number: tableMeta.rowData[7],
                  },
                });
              }}
            >
              Edit
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };

  useEffect(() => {
    const requestData = (async () => {
      const token = localStorage.getItem("token");
      if(token === null) props.history.replace('/');
      const tempToken = decodeToken();
      setDecodedToken(tempToken);
      const url = API_URL + "/agency/view/customers";
      const headers = {
        authorization: "Bearer " + token,
        id: tempToken["sub"],
      };
      var response;
      try {
        response = await axios.get(url, { headers });
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
            if(key === 'registration_date') {
              element[key] = Moment(element[key]).format('DD-MM-YYYY');
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
};

export default ViewCustomersComponent;
