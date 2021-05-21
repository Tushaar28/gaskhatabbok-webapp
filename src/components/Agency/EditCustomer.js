import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NavbarComponent from "../shared/Navbar";
import NotificationComponent from "../shared/Notification";

export default function EditCustomerComponent(props) {
  const [decodedToken, setDecodedToken] = useState([]);
  const [qrCodeId, setQrCodeId] = useState(props.location.state.qr_code_id);
  const [consumerNumer, setConsumerNumber] = useState(
    props.location.state.consumer_number
  );
  const [agencyId, setAgencyId] = useState(props.location.state.agency_id);
  const [lpg, setLpg] = useState(props.location.state.lpg_id);
  const [mobile, setMobile] = useState(props.location.state.mobile);
  const [registationDate, setRegistrationDate] = useState(
    props.location.state.registration_date
  );
  const [registeredBy, setRegisteredBy] = useState(
    props.location.state.registered_by
  );
  const [workerMobile, setWorkerMobile] = useState(
    props.location.state.worker_mobile_number
  );
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
    if (lpg.length > 0 && lpg.length !== 17) return false;
    return mobile.length === 10;
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = API_URL + "/agency/worker/edit";
    const headers = {
      authorization: "Bearer " + token,
      id: decodedToken["sub"],
    };
    const body = {
      qr_code_id: qrCodeId,
      mobile: mobile,
      consumer_number: consumerNumer,
      lpg_id: lpg,
    };

    var response;
    try {
      response = await axios.put(url, body, { headers });
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
        setMessage("Customer updated successfully");
        setNotificationType("success");
        setOpenNotify(true);
        setTimeout(function () {
          props.history.replace('/agency/home/view/customers');
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
        Edit Customer
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
          <label htmlFor="qr" className="col-sm-2 col-form-label">
            QR Code ID
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={qrCodeId}
              type="text"
              className="form-control"
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lpg" className="col-sm-2 col-form-label">
            LPG ID
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={lpg}
              onChange={(e) => setLpg(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Enter LPG ID"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="consumer" className="col-sm-2 col-form-label">
            Consumer Number
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={consumerNumer}
              onChange={(e) => setConsumerNumber(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter consumer number"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
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
              className="form-control"
              placeholder="Enter mobile number"
            />
          </div>
        </div>
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
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="registration_date"
            className="col-sm-2 col-form-label"
          >
            Registration Date
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={registationDate}
              type="text"
              className="form-control"
              readonly
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="registered_by" className="col-sm-2 col-form-label">
            Registration by Worker
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={registeredBy}
              type="text"
              className="form-control"
              readonly
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="worker_mobile_number"
            className="col-sm-2 col-form-label"
          >
            Worker Mobile Number
          </label>
          <div class="col-sm-10">
            <input
              style={{
                width: "50%",
              }}
              value={workerMobile}
              type="text"
              className="form-control"
              readonly
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
