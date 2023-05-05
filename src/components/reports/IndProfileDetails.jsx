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
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircle } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import BadgeIcon from "@mui/icons-material/Badge";
import HouseSidingRoundedIcon from "@mui/icons-material/HouseSidingRounded";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";

import "@fontsource/roboto/300.css";

import API from "../../api/root";
import { setHeaders } from "../../api";
import { useParams } from "react-router-dom";

import MoonLoader from "react-spinners/MoonLoader";

import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 200;

const IndProfileDetails = ({ setIsIndProfileDetailsOpen }) => {
  useEffect(() => {
    setIsIndProfileDetailsOpen(true);
    return () => setIsIndProfileDetailsOpen(false); // reset the state when the component unmounts
  }, []);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [indProfile, setIndProfile] = useState(null);

  useEffect(() => {
    API()
      .get(`/indprofiles/${id}`, setHeaders())
      .then((response) => {
        setIndProfile(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  console.log(id);
  console.log(indProfile);

  if (!auth._id) return <Navigate to="/signin" />;

  if (!indProfile) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <MoonLoader color="#0d75a8" />
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        mx: "auto",
        my: "auto",
        width: 800,
        height: 1000,
        border: "1px solid black",
        marginTop: "30px",
      }}>
      <Paper variant="outlined">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ marginTop: "30px", marginLeft: "40px" }}>
          <Grid container alignItems="center">
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="h6">Individual Risk Profile</Typography>
            </Grid>

            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="subtitle2">Name: </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {indProfile.fullname}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="subtitle2">Account No: </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {indProfile.account_no}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="subtitle2">Customer ID: </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {indProfile.cust_id}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default IndProfileDetails;
