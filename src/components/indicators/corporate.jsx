import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { signOut } from "../../store/actions/authAction";
import {
  getIndProfiles,
  addIndProfile,
} from "../../store/actions/indProfilerAction";

// import Avatar from "@material-ui/core";
import { CssBaseline, FormControlLabel, Avatar } from "@material-ui/core";
// import FormControlLabel from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
import { Container } from "@material-ui/core";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import BadgeIcon from "@mui/icons-material/Badge";
import HouseSidingRoundedIcon from "@mui/icons-material/HouseSidingRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    flexGrow: 1,
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
  headerCell: {
    backgroundColor: "#9a9c9b",
    color: "white",
    textAlign: "right",
    fontWeight: "bold",
  },
  appbarStyle: {
    background: "#f2f9f8",
    elevation: 0,
  },
}));

const Corporate = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const indicators = useSelector((state) => state.indicators);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [descriptions, setDescriptions] = useState({});
  const [newDescriptions, setNewDescriptions] = useState({});
  const [score, setScore] = useState(0);
  const [fullname, setFullname] = useState("fullname");
  const [accountNo, setAccountNo] = useState(0);
  const [custId, setCustId] = useState(0);
  const [nid, setNid] = useState(0);
  const [branch, setBranch] = useState(0);
  //const [selectedItems, setSelectedItems] = useState({});

  const handleDescriptionChange = (indicatorId, indicatorName, value) => {
    const selectedItem = items.find((item) => item.item_description === value);
    const indName = indicatorName.toLowerCase().replace(/\s+/g, "_");

    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [indicatorName]: value,
      [indicatorName + "_score"]: selectedItem.score,
    }));

    setNewDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [indicatorName.toLowerCase().replace(/\s+/g, "_")]: value,
      [indicatorName.toLowerCase().replace(/\s+/g, "_") + "_score"]:
        selectedItem.score,
      ["fullname"]: fullname,
      ["cust_id"]: custId,
      ["account_no"]: accountNo,
      ["nid"]: nid,
      ["branch"]: branch,
    }));

    setScore(score + parseInt(selectedItem.score));
    //console.log(selectedItem.score);
    //console.log(descriptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newDescriptions);
    console.log(newDescriptions.fullname);
    dispatch(addIndProfile(newDescriptions));
  };

  const currencies = [
    {
      value: "Head Office",
      label: "Head Office",
    },
    {
      value: "La branch",
      label: "La branch",
    },
    {
      value: "Madina branch",
      label: "Madina branch",
    },
    {
      value: "Teshie branch",
      label: "Teshie branch",
    },
  ];
  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };
  const handleResetFields = () => {
    setDescriptions({});
    setScore(0);
  };

  if (!auth._id) return <Navigate to="/signin" />;

  return (
    <Container
      component="main"
      maxWidth="lg"
      spacing={2}
      className={classes.root}>
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
              Corporate Profiler
            </Typography>
            {/* this div is at far left */}
            {/* content */}
          </div>
          <div>
            <div style={{ marginTop: "70px", marginRight: "60px" }}>
              <Badge
                badgeContent={score}
                color="primary"
                style={{ transform: "scale(3)", marginBottom: "20px" }}>
                <BadgeIcon color="action" style={{ fontSize: 20 }} />
              </Badge>
              {score < 34 && score > 0 ? (
                <div>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="textPrimary"
                    style={{ color: "#4557f6" }}>
                    Low Risk
                  </Typography>
                </div>
              ) : score > 34 && score < 74 ? (
                <div>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="textPrimary">
                    Medium Risk
                  </Typography>
                </div>
              ) : score < 1 ? (
                <div></div>
              ) : (
                <div>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="textPrimary">
                    High Risk
                  </Typography>
                </div>
              )}
            </div>
            {/* this div is in the center */}
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
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "px", marginTop: "150px" }}>
          <Grid item xs={4}>
            <>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell className={classes.headerCell} align="left">
                          Up to 34
                        </TableCell>
                        <TableCell align="right">Low</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </Grid>
          <Grid item xs={4}>
            <>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell className={classes.headerCell} align="left">
                          34 to 74
                        </TableCell>
                        <TableCell align="right">Medium</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </Grid>
          <Grid item xs={4}>
            <>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell className={classes.headerCell} align="left">
                          Above 74
                        </TableCell>
                        <TableCell align="right">High</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "20px", marginTop: "20px" }}>
          <Grid item xs={12}>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  id="input-with-sx outlined-multiline-flexible"
                  label="Account Name"
                  variant="standard"
                  fullWidth
                  multiline
                  maxRows={3}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                />
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  id="input-with-sx"
                  label="Customer ID"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustId(e.target.value);
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <NumbersRoundedIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  id="input-with-sx"
                  label="Account No."
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setAccountNo(e.target.value);
                  }}
                />
                <HouseSidingRoundedIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  id="input-with-sx"
                  label="ID number"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setNid(e.target.value);
                  }}
                />
                <HouseSidingRoundedIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  required
                  id="outlined-select-currency"
                  select
                  label="Select Branch"
                  fullWidth
                  defaultValue="La branch"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={2}>
            <Badge
              badgeContent={score}
              color="primary"
              style={{ transform: "scale(3)", marginBottom: "20px" }}>
              <BadgeIcon color="action" style={{ fontSize: 20 }} />
            </Badge>
            {score < 34 && score > 0 ? (
              <div>Low Risk...</div>
            ) : score > 34 && score < 74 ? (
              <div>Medium Risk</div>
            ) : score < 1 ? (
              <div></div>
            ) : (
              <div>High Risk</div>
            )}
          </Grid> */}
        </Grid>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container spacing={1}>
              {indicators
                .filter((indicator) => indicator.indicator_type === "Corporate")
                .map((indicator) => {
                  const indicatorId = indicator._id;
                  const indicatorName = indicator.indicator_name;
                  const description = descriptions[indicatorName] || "";

                  return (
                    <Grid item xs={6} key={indicatorId}>
                      <TextField
                        id={`outlined-select-title-${indicatorId}`}
                        select
                        label={indicator.indicator_name}
                        variant="outlined"
                        required
                        fullWidth
                        value={description}
                        onChange={(e) => {
                          handleDescriptionChange(
                            indicatorId,
                            indicatorName,
                            e.target.value
                          );
                          items
                            .filter(
                              (item) =>
                                item.indicator_name.includes(
                                  indicator.indicator_name
                                ) && item.indicator_type === "Corporate"
                            )
                            .map((item) => {
                              // code to be executed for each filtered item
                            });
                        }}
                        disabled={description.length > 1}>
                        {items
                          .filter((item) =>
                            item.indicator_name.includes(
                              indicator.indicator_name
                            )
                          )
                          .filter((item) => item.indicator_type === "Corporate")
                          .map((item) => (
                            <MenuItem
                              key={item._id}
                              value={item.item_description}>
                              {item.item_description}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>

          <Button
            type="reset"
            variant="contained"
            color="inherit"
            className={classes.submit}
            style={{ marginRight: "10px" }}
            onClick={handleResetFields}>
            Reset Fields
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Corporate;
