import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function EditAgencyComponent(props) {
  const [decodedToken, setDecodedToken] = useState([]);
  const [agencyId, setAgencyId] = useState(props.location.state.agency_id);
  const [agencyName, setAgencyName] = useState(
    props.location.state.agency_name
  );
  const [ownerName, setOwnerName] = useState(props.location.state.owner_name);
  const [mobile, setMobile] = useState(props.location.state.mobile);
  const [password, setPassword] = useState("");
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) props.history.replace("/");
    const tempToken = decodeToken();
    setDecodedToken(tempToken);
  }, []);

  const validate = () => {
    return agencyName.length > 0 && ownerName.length > 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = API_URL + "/admin/agency/edit";
    const headers = {
      authorization: "Bearer " + token,
      id: decodedToken["sub"],
    };
    const body = {
      agency_id: agencyId,
      agency_name: agencyName,
      mobile: mobile,
      owner_name: ownerName,
      password: password,
    };
    const body1 = {
      agency_id: agencyId,
      agency_name: agencyName,
      mobile: mobile,
      owner_name: ownerName,
    };

    var response;
    try {
        if (password.length > 0)
        response = await axios.put(url, body, { headers });
      else response = await axios.put(url, body1, { headers });
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
        setMessage("Agency updated successfully");
        setNotificationType("success");
        setOpenNotify(true);
        setTimeout(function () {
          props.history.replace('/admin/home');
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
        Edit Agency
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
              type="text"
              className="form-control"
              placeholder="Enter agency ID"
              readonly
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
              type="text"
              className="form-control"
              placeholder="Enter agency ID"
              onChange={(e) => setAgencyName(e.target.value)}
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
              type="text"
              className="form-control"
              placeholder="Enter agency ID"
              onChange={(e) => setOwnerName(e.target.value)}
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
              type="number"
              className="form-control"
              placeholder="Enter mobile number"
              onChange={(e) => setMobile(e.target.value)}
              pattern="^[6789]\d{9}$"
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
              type="text"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              maxLength="15"
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
        <button
          type="reset"
          className="btn btn-danger"
          onClick={() => props.history.goBack()}
        >
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
