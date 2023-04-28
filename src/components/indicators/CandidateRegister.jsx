import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signUp } from "../../store/actions/authAction";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Avatar from "@material-ui/core";
import { CssBaseline, FormControlLabel, Avatar } from "@material-ui/core";
// import FormControlLabel from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
import { Container } from "@material-ui/core";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Select from "@material-ui/core/Select";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import "../indicators/image.css";
import placeholder from "../indicators/placeholder.png";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Etitles = [
  {
    value: "general",
    label: "General Elections",
  },
  {
    value: "itDepartment",
    label: "IT Departmental Election",
  },
  {
    value: "accDepartment",
    label: "Accounting Departmental Election",
  },
  {
    value: "mgntDepartment",
    label: "Management Departmental Election",
  },
  /* Image Css */
];

const Positions = [
  {
    value: "president",
    label: "President",
  },
  {
    value: "gsecretary",
    label: "General Secretary",
  },
  {
    value: "treasurer",
    label: "Treasurer",
  },
  {
    value: "accountant",
    label: "Accountant",
  },
];

const Cadidates = () => {
  const [{ alt, src }, setImg] = useState({
    src: placeholder,
    alt: "Upload an Image",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const [Etitle, setEtitle] = useState("");

  const handleTitleChange = (event) => {
    setEtitle(event.target.value);
  };

  const [bPositions, setbPositions] = useState("");

  const handlebPositionChange = (event) => {
    setbPositions(event.target.value);
  };

  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(auth)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   dispatch(signUp(user));
  //   setUser({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // };

  //if (!auth._id) return <Navigate to="/signin" />;

  return (
    <Container component="main" maxWidth="lg" spacing={2}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Canditate
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="CandidateName"
                  name="candidateName"
                  variant="outlined"
                  required
                  fullWidth
                  id="candidateName"
                  label="Candidate Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="CandidateName"
                  name="candidateName"
                  variant="outlined"
                  required
                  fullWidth
                  id="candidateName"
                  label="Candidate Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Select Title"
                  variant="outlined"
                  required
                  fullWidth
                  value={Etitle}
                  onChange={handleTitleChange}>
                  {Etitles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-position"
                  select
                  label="Select Ballot Position"
                  variant="outlined"
                  required
                  fullWidth
                  value={bPositions}
                  onChange={handlebPositionChange}>
                  {Positions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="CandidateName"
                  name="candidateName"
                  variant="outlined"
                  required
                  fullWidth
                  id="candidateName"
                  label="Candidate Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="CandidateName"
                  name="candidateName"
                  variant="outlined"
                  required
                  fullWidth
                  id="candidateName"
                  label="Candidate Name"
                  autoFocus
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Cadidates;
