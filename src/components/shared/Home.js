import React, { useEffect, useState } from "react";

import decodeToken from "../../services/token";

const HomeComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken();
      if (decodedToken["is_admin"] === true)
        props.history.replace("/admin/home");
      else props.history.replace("/agency/home");
    }
  }, []);

  const validate = () => {
    return name.length > 0 && mobile.length === 10 && message.length > 0;
  }

  const submit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          className="navbar navbar-expand-lg top navbar-dark bg-primary navbar-fixed-top"
          style={{ width: "100%" }}
        >
          <a className="navbar-brand" href="">
            Gas KhataBook
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav mr-4">
              <li class="nav-item">
                <a class="nav-link" data-value="about" href="#about">
                  About us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " data-value="portfolio" href="#partner">
                  Why partner with us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " data-value="team" href="#contact">
                  Contact us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " data-value="contact" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          textAlign: "left",
        }}
      >
        <div id="about" className="text-center">
          <h1>About us</h1>
          <p
            style={{
              textAlign: "left",
            }}
          >
            Gas KhataBook is a Saas (Software as a Service) product which
            streamlines the process of post gas delivery management systems. It
            offers a one stop solution for managing and tracking gas deliveries.
            Our unique tracking system keeps track not only of the customers but
            also the method of payment by the customer. We have also partnered
            with famous payment companies and provide an unique approach of
            payment handling and mitigates the problems faced by the customers
            and agencies. Our parent company (Bagoyo Flexible Storage Solutions
            Pvt. Ltd.) is recognized by Startup Bihar, Startup India, DPIIT
            (Department for Promotion of Industry and Internal Trade). We are
            currently incubated by JSS Business Incubator, Noida and Venture
            Park Patna. Our parent company are awarded by IIM Calcutta.
          </p>
        </div>
      </div>
      <hr />
      <div
        id="partner"
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          textAlign: "left",
        }}
      >
        <div className="text-center">
          <h1>Why partner with us</h1>
          <p
            style={{
              textAlign: "left",
            }}
          >
            We offer a way to efficiently manage your gas delivery process. Our
            software is free of cost which helps you to track your customers and
            deliveries at one place. With this, forget about the hustle of book
            keeping the deliveries and updating it to your system, We offer a
            visualization service so that you can analyze your deliveries over a
            period of time. It reduces human error, increases your speed of
            process upto 2x and provides transparency in the process.
          </p>
        </div>
      </div>
      <hr />
      <div
        id="contact"
        className="row"
        style={{
          display: "flex",
          marginLeft: "30px",
          marginRight: "30px",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Connect with us
          </h1>
          <br />
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group row">
              <label htmlFor="agency_id" className="col-sm-2 col-form-label">
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
              <label htmlFor="agency_id" className="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  style={{
                    width: "50%",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="agency_id" className="col-sm-2 col-form-label">
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
                  minLength="10"
                  maxLength="10"
                  className="form-control"
                  placeholder="Enter mobile"
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="agency_id" className="col-sm-2 col-form-label">
                Message
              </label>
              <div class="col-sm-10">
                <textarea
                  rows="10"
                  cols="70"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button
          type="submit"
          disabled={!validate()}
          className="btn btn-primary"
        >
          Submit
        </button>
          </form>
          <p
            style={{
              textAlign: "left",
            }}
          >
            <br />
            Contact us on <strong>7528854999</strong>,{" "}
            <strong>9872577979</strong> or email us at{" "}
            <strong>
              <a href="mailto:contact@gaskhatabook.com">
                contact@gaskhatabook.com
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
