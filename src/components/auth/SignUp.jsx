import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from "../../store/actions/authAction";
import { signOut } from "../../store/actions/authAction";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Avatar from "@material-ui/core";
import { CssBaseline, FormControlLabel, Avatar } from "@material-ui/core";
// import FormControlLabel from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
import { Container } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    display: "flex",

    alignItems: "flex-end",
    width: "100%",
    height: "max-content",
  },

  linkStyle: {
    color: "grey",
    textDecoration: "none",
  },
  paperContainer: {
    height: 1356,
    backgroundImage: `url(${"../Votes/back.jpg"})`,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  appbarStyle: {
    background: "#f2f9f8",
    elevation: 0,
  },
}));

const Etitles = [
  {
    value: "admin",
    label: "Administrator",
  },
  {
    value: "user",
    label: "User",
  },
];
const SignUp = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(auth)
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
  });

  const [Etitle, setEtitle] = React.useState("");

  const handleTitleChange = (event) => {
    setUser({ ...user, role: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(user));
    /* setUser({
      fname: "",
      lname: "",
      email: "",
      password: "",
    }); */
  };

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  if (auth.role !== "admin") return <Navigate to="/signin" />;

  return (
    <Container component="main" className={classes.root} maxWidth="xs">
      <AppBar
        elevation={0}
        className={classes.appbarStyle}
        position="fixed"
        style={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h6" noWrap component="div" color="textPrimary">
              User Manager
            </Typography>
            {/* this div is at far left */}
            {/* content */}
          </div>

          <div>
            <div style={{ marginRight: "40px" }}>
              <PowerSettingsNewOutlinedIcon
                onClick={() => HandleSignOut()}
                color="action"
              />
            </div>
            {/* this div is at far right */}
            {/* content */}
          </div>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new user
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={user.fname}
                onChange={(e) => setUser({ ...user, fname: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={user.lname}
                onChange={(e) => setUser({ ...user, lname: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-title"
                select
                label="Select Role"
                variant="outlined"
                required
                fullWidth
                value={user.role}
                onChange={handleTitleChange}
                helperText="Select role">
                {Etitles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Add
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className={classes.linkStyle} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
