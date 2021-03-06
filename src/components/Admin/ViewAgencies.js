import Paper from "@material-ui/core/Paper";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NotificationComponent from "../shared/Notification";

export default function ViewAgenciesComponent(props) {
  const { history } = props;
  const [agencies, setAgencies] = useState([]);
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  var decodedToken;

  const columns = [
    "Agency ID",
    "Agency Name",
    "Owner Name",
    "Mobile",
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
                  pathname: "/admin/home/agency/edit",
                  state: {
                    agency_id: tableMeta.rowData[0],
                    agency_name: tableMeta.rowData[1],
                    owner_name: tableMeta.rowData[2],
                    mobile: tableMeta.rowData[3],
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
      decodedToken = decodeToken();
      const url = API_URL + "/admin/view/agencies";
      const headers = {
        authorization: "Bearer " + token,
        id: decodedToken["sub"],
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
            temp.push(element[key]);
          }
          tempCustomers.push(temp);
        }
        setAgencies(tempCustomers);
      }
    })();
  }, []);

  if (agencies.length === 0) {
    return (
      <div>
        <h3>No registered agencies</h3>
      </div>
    );
  } else {
    return (
      <div>
        <Paper>
          <MUIDataTable
            title={"Registered Agencies"}
            data={agencies}
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
