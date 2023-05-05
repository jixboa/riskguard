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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonBase from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import { MdDelete } from "react-icons/md";

import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import Slide from "@mui/material/Slide";
import MoonLoader from "react-spinners/MoonLoader";

import { List, ListItem, ListItemText } from "@material-ui/core";

import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 200;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const data = [
  { name: "John", age: 25, city: "New York" },
  { name: "Jane", age: 30, city: "Los Angeles" },
  { name: "Bob", age: 35, city: "Chicago" },
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const IndProfiles = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const indicators = useSelector((state) => state.indicators);
  const indprofiles = useSelector((state) => state.indprofiles);
  console.log(indprofiles);
  const items = useSelector((state) => state.items);
  const scores = useSelector((state) => state.scores);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [score, setScore] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemsWithScoreNames = items.map((item) => ({
    ...item,
    score_name:
      scores.find((score) => score.score_points === parseInt(item.score, 10))
        ?.score_range || "Unknown",
  }));

  useEffect(() => {
    const newTableData = indprofiles.map((profile) => [
      profile.branch,
      profile.fullname,
      profile.cust_id,
      profile.account_no,
      profile.total_score,
      profile._id,
    ]);

    setTableData(newTableData);
  }, [indprofiles]);

  const branches = [
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

  const columns = [
    "Branch",
    {
      name: "Name",
      options: {
        filterOptions: { fullWidth: true },
      },
    },
    "Customer ID",
    "Account No",
    "Score",
    {
      name: "Edit",
      label: "-",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          //<PreviewIcon onClick={() => handleEdit(tableMeta.rowData)} />
          <IconButton
            component={Link} // Use Link instead of button
            to={`/indprofiledetails/${tableMeta.rowData[5]}`} // Specify the ID of the profile to display
            target="_blank">
            <PreviewIcon />
          </IconButton>
        ),
        display: true,
      },
    },
  ];
  //const [muidata, setMuiData] = useState([]);

  const options = {
    displayNoMatch: false,
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 5,
    size: "small",
    search: true,
    download: true,
    print: true,
    filter: false,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "single",
    selectableRowsOnClick: false,
    onRowClick: (rowData, rowMeta) => {},
    editable: {
      onRowUpdate: (updatedData, dataIndex) => {
        console.log(updatedData, dataIndex);
        // You can perform any update operation here using updatedData
      },
    },

    onTableChange: (action, state) => {
      state = { tableData };
    },
    //onRowsDelete: handleDeleteRows,

    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div style={{ marginRight: "20px" }}>
        <MdDelete
          onClick={() => {
            const selectedIds = selectedRows.data.map(
              (item) => tableData[item.index][5]
            );
            handleDeleteRows(selectedIds);
            setSelectedRows([]);
          }}
        />
      </div>
    ),
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
              Individual Profiles
            </Typography>
            {/* this div is at far left */}
            {/* content */}
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "40px",
              }}>
              <>
                <>
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={
                      <Avatar
                        src={auth.fname}
                        style={{ width: "24px", height: "24px" }}
                      />
                    }
                    style={{ color: "#16315c" }}>
                    {auth.fname}
                  </Button>
                </>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                    disableRipple>
                    <CreditScoreIcon />
                    <Link className={classes.linkStyle} to="/#">
                      Change Password
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      HandleSignOut();
                    }}
                    disableRipple>
                    <PowerSettingsNewOutlinedIcon />
                    <Typography>Signout</Typography>
                  </MenuItem>
                </StyledMenu>
              </>
            </div>
            {/* this div is at far right */}
            {/* content */}
          </div>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper} style={{ marginTop: "100px" }}>
        <Typography>Individual profiles data</Typography>
        {tableData.length > 1 ? (
          <div>
            <CacheProvider value={muiCache} style={{ margintop: "20px" }}>
              <ThemeProvider theme={createTheme()}>
                <div className={classes.root}>
                  <MUIDataTable
                    title={
                      <Typography variant="h6">
                        Indicators Descriptions
                      </Typography>
                    }
                    data={tableData}
                    columns={columns}
                    options={options}
                    classes={{
                      row: {
                        root: classes.tableRow,
                      },
                    }}
                  />
                </div>
              </ThemeProvider>
            </CacheProvider>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
            <MoonLoader color="#0d75a8" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default IndProfiles;
