import React, { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { AuthContext } from "../../contexts/authContext"

const TemplateLoginPage = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
        <Box component ="div" pt={10} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Typography component="h2" variant="h3">
            Sign up for TMDB Client
          </Typography>
        </Box>
        <Box component ="div" pt={5} sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
           id="username"
            label="Username"
           type="text"
           autoFocus
           onChange={e => {setUserName(e.target.value)}}
          />
        </Box>
        <Box component ="div" pt={1} sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={e => {setPassword(e.target.value)}}
          />
        </Box>
        <Box component ="div" pt={1} sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
            id="password-again"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={e => {setPasswordAgain(e.target.value)}}
          />
        </Box>
        <Box component ="div" pt={1} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button
          variant="contained"
          color="primary"
          onClick={register}
          >
            Sign Up
          </Button>
        </Box>


        
    </>
  );
};

export default TemplateLoginPage;