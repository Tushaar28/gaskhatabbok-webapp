import React, { useState } from "react";

export default function CustomerDetailComponent(props) {
  const [code, setCode] = useState("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [lpg, setLpg] = useState("");
  const [agency, setAgency] = useState("");

  const validate = () => {
    return code.length > 0;
  };

  return (
    <div>
      <h2
        style={{
          marginLeft: "20px",
          marginBotton: "20px",
        }}
      >
        Add Customer
      </h2>
      <form
        onSubmit={(e) => null}
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
            width: "50%"
          }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Qr Code ID"
              required
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
                width: "50%"
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
              width: "50%"
            }}
              value={consumerNumber}
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
              width: "50%"
            }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Enter mobile number"
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
        <button type="cancel" className="btn btn-danger">
          Cancel
        </button>
      </form>
    </div>
  );
}
