import { Avatar, Button, Checkbox, Paper, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import LockedOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NotificationComponent from "./Notification";

const LoginComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      const decodedToken = decodeToken();
      if(decodedToken['is_admin'] === true)
        props.history.replace('/admin/home');
      else
        props.history.replace('/agency/home');
    }
  }, []);

  const paperStyle = {
    padding: "30px",
    width: 280,
  };

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const btnStyle = {
    margin: "30px 0",
  };

  const validate = () => {
    return validateUsername() && validatePassword();
  };

  const validateUsername = () => {
    return username.length > 0;
  };

  const validatePassword = () => {
    return password.length >= 6 && password.length <= 15;
  };

  const submit = async (event) => {
    var response;
    event.preventDefault();
    const url = API_URL + "/login";
    try {
      response = await axios.post(url, {
        username: username,
        password: password,
      });
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
      localStorage.setItem("token", response.data.jwt);
      var decodedToken = decodeToken();

      if (decodedToken["is_admin"] === true)
        props.history.replace("/admin/home");
      else props.history.replace("/agency/home");
    }
  };

  return (
    <div>
      <form
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
        }}
        onSubmit={(e) => submit(e)}
      >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockedOutlinedIcon />
              </Avatar>
              <h2>Login</h2>
            </Grid>
            <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              errorText={
                !validateUsername() ? "Please enter valid username" : ""
              }
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername();
              }}
            />
            <br />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              style={{
                marginTop: "30px",
              }}
              errorText={
                !validatePassword()
                  ? "Password must be between 6-15 characters"
                  : ""
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
            />
            <Button
              variant="contained"
              style={btnStyle}
              type="submit"
              color="primary"
              fullWidth
              disabled={!validate()}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </form>
      <NotificationComponent
        openNotify={openNotify}
        setOpenNotify={setOpenNotify}
        message={message}
        notificationType={notificationType}
      />
    </div>
  );
};

export default LoginComponent;
