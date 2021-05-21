import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function AddAgencyComponent(props) {
  const [decodedToken, setDecodedToken] = useState([]);
  const [agencyId, setAgencyId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
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
    props.history.replace('/admin/home');
  }

  const validate = () => {
      return agencyName.length > 0 && ownerName.length > 0 && agencyId.length > 0 && password.length >= 6 && mobile.length === 10;
  };

  const submit = async (event) => {
    event.preventDefault();
    token = localStorage.getItem("token");
    const url = API_URL + "/admin/agency/new";
    const headers = {
      authorization: "Bearer " + token,
      id: decodedToken["sub"],
    };
    const body = {
      mobile: mobile,
      password: password,
      owner_name: ownerName,
      agency_name: agencyName,
      agency_id: agencyId,
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
      setMessage("Agency added successfully");
      setNotificationType("success");
      setOpenNotify(true);
      setTimeout(function () {
        props.history.replace("/admin/home");
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
        Add Agency
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
          <label htmlFor="agency_id" className="col-sm-2 col-form-label">
            Agency ID
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter agency ID"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="agency_name" className="col-sm-2 col-form-label">
            Agency Name
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter agency name"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="owner_name" className="col-sm-2 col-form-label">
            Owner Name
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter owner name"
              required
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
              minLength='6'
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
              minLength='10'
              maxLength='10'
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
