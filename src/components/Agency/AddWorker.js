import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function AddWorkerComponent(props) {
  const [decodedToken, setDecodedToken] = useState([]);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  var token;

  useEffect(() => {
    token = localStorage.getItem("token");
    if (token === null) props.history.replace("/");
    const tempToken = decodeToken();
    setDecodedToken(tempToken);
  }, []);

  const cancel = (event) => {
    event.preventDefault();
    props.history.replace('/agency/home');
  }

  const validate = () => {
      return name.length > 0 && mobile.length === 10 && password.length >= 6;
  };

  const submit = async (event) => {
    token = localStorage.getItem('token');
    event.preventDefault();
    const url = API_URL + "/agency/worker/new";
    const headers = {
      authorization: "Bearer " + token,
      id: decodedToken["sub"],
    };
    const body = {
      mobile: mobile,
      name: name,
      password: password,
      agency_id: decodedToken["sub"],
    };

    var response;
    try {
      response = await axios.post(url, body, { headers });
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
      setMessage("Worker added successfully");
      setNotificationType("success");
      setOpenNotify(true);
      setTimeout(function () {
        props.history.replace('/agency/home/view/workers');
      }, 2000);
    }
  };

  return (
    <div>
      <NavbarComponent decodedToken={decodedToken} />
      <br />
      <h2
        style={{
          marginLeft: "20px",
          marginBotton: "20px",
        }}
      >
        Add Worker
      </h2>
      <form
        onSubmit={(e) => submit(e)}
        style={{
          marginLeft: "20px",
          marginTop: "30px",
          marginRight: "50px",
        }}
      >
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter name"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="mobile" className="col-sm-2 col-form-label">
            Mobile
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="number"
              pattern="^[6789]\d{9}$"
              className="form-control"
              placeholder="Enter mobile number"
              required
              minLength='10'
              maxLength='10'
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter password"
              minLength="6"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!validate()}
          className="btn btn-primary"
        >
          Submit
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="cancel" className="btn btn-danger" onClick={(e) => cancel(e)}>
          Cancel
        </button>
      </form>
      <NotificationComponent
        openNotify={openNotify}
        setOpenNotify={setOpenNotify}
        message={message}
        notificationType={notificationType}
      />
    </div>
  );
}
