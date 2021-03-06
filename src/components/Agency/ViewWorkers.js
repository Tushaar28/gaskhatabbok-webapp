import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function ViewWorkersComponent(props) {
  const { history } = props;
  const [workers, setWorkers] = useState([]);
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [decodedToken, setDecodedToken] = useState([]);

  const columns = [
    "Name",
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
                  pathname: "/agency/home/worker/edit",
                  state: {
                    name: tableMeta.rowData[0],
                    mobile: tableMeta.rowData[1],
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
      const tempToken = decodeToken();
      setDecodedToken(tempToken);
      const url = API_URL + "/agency/view/workers";
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
        var tempWorkers = [];
        for (var i = 0; i < response.data.message.length; i++) {
          var element = response.data.message[i];
          var temp = [];
          for (let key in element) {
            temp.push(element[key]);
          }
          tempWorkers.push(temp);
        }
        setWorkers(tempWorkers);
      }
    })();
  }, []);

  if (workers.length === 0) {
    return (
      <div>
        <NavbarComponent decodedToken={decodedToken} />
        <h3>No registered workers</h3>
      </div>
    );
  } else {
    return (
      <div>
        <NavbarComponent decodedToken={decodedToken} />
        <Paper>
          <MUIDataTable
            title={"Registered Workers"}
            data={workers}
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
