import { Avatar, Button, Paper, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import LockedOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import React, { useEffect, useState } from "react";

import API_URL from "../../services/api";
import decodeToken from "../../services/token";
import NotificationComponent from "./Notification";

export default function LoginComponent(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openNotify, setOpenNotify] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken();
      if (decodedToken["is_admin"] === true)
        props.history.replace("/admin/home");
      else props.history.replace("/agency/home");
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    <div className="row">
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
            <span>
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
            </span>
            <br />
            <InputLabel
              style={{
                marginTop: "20px",
              }}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={visibility ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword();
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      setVisibility(!visibility);
                    }}
                  >
                    {visibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
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
}
