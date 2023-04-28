import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  makeStyles,
  Checkbox,
  CssBaseline,
  Container,
  InputLabel,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import { loadUser } from "../../store/actions/authAction";

//import { makeStyles } from "@material-ui/core/styles";
import {
  addIndicator,
  editIndicator,
  deleteIndicator,
} from "../../store/actions/indicatorAction";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "../../store/actions/authAction";

import { Link } from "react-router-dom";
// import Avatar from "@material-ui/core";
//import { CssBaseline, FormControlLabel, Avatar } from "@material-ui/core";
// import FormControlLabel from "@material-ui/core";
//import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { LockOutlined } from "@mui/icons-material";
//import { Container } from "@material-ui/core";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Select from "@material-ui/core/Select";
//import { InputLabel } from "@material-ui/core";
//import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { MdDelete } from "react-icons/md";
import Slide from "@mui/material/Slide";
import MoonLoader from "react-spinners/MoonLoader";

import "@fontsource/roboto/400.css";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 200;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  tableRow: {
    height: "10px", // set the height of the table rows
  },
  appbarStyle: {
    background: "#f2f9f8",
    elevation: 0,
  },
}));

const Indicators = [
  {
    value: "individual",
    label: "Individual",
  },
  {
    value: "Corporate",
    label: "Corporate",
  },
];

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const IndicatorManager = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const indicators = useSelector((state) => state.indicators);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const indicatorTypeRef = useRef(null);

  const [indicatorType, setIndicatorType] = useState("");
  const [indicatorName, setIndicatorName] = useState("");
  const [editIndicatorName, seteditIndicatorName] = useState("");
  const [editIndicatorType, seteditIndicatorType] = useState("");
  const [editIndicatorId, seteditIndicatorId] = useState("");

  const [deleteDialogue, setDeleteDialogueOpen] = useState(false);
  const [editDialogue, setEditDialogueOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState([]);

  const [tableData, setTableData] = useState([]);

  const handleClose = () => setOpen(false);
  const handleDeleteDialogClose = () => setDeleteDialogueOpen(false);
  const handleEditDialogClose = () => setEditDialogueOpen(false);
  const handleEditDialogOpen = () => setEditDialogueOpen(true);

  const handleDeleteDialogueOpen = () => {
    setDeleteDialogueOpen(true);
  };

  const {
    resetField,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const newTableData = indicators.map((indicator) => [
      indicator.indicator_type,
      indicator.indicator_name,
      indicator._id,
    ]);

    setTableData(newTableData);
  }, [indicators]);

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("indicator_type", indicatorType);
    formData.append("indicator_name", indicatorName);

    dispatch(addIndicator(formData));
  };

  const handleEdit = (indicator) => {
    const indicatorType = indicator[0];
    const indicatorName = indicator[1];
    const indicatorId = indicator[2];

    seteditIndicatorType(indicatorType);
    seteditIndicatorName(indicatorName);
    seteditIndicatorId(indicatorId);

    handleEditDialogOpen();
  };

  const handleUpdate = () => {
    ///console.log(editScoreID, editScoreRange);

    const updateData = {
      new_name: editIndicatorName,
    };
    dispatch(editIndicator(updateData, editIndicatorId));

    handleEditDialogClose();
  };

  const handleDeleteRows = (rowsDeleted) => {
    const itemsToDelete = rowsDeleted;
    setItemToDelete(itemsToDelete);
    handleDeleteDialogueOpen();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteIndicator(itemToDelete));
    handleDeleteDialogClose();
  };

  const columns = [
    {
      name: "Indicator Type",
      options: {
        filterOptions: { fullWidth: true },
      },
    },
    "Indicator Name",

    {
      name: "Edit",
      label: "-",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <EditOutlinedIcon onClick={() => handleEdit(tableMeta.rowData)} />
        ),
        display: true,
      },
    },
  ];
  //const [muidata, setMuiData] = useState([]);

  const options = {
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 5,
    size: "small",
    search: true,
    download: true,
    print: true,
    filter: false,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
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
              (item) => tableData[item.index][2]
            );
            handleDeleteRows(selectedIds);
            setSelectedRows([]);
          }}
        />
      </div>
    ),
  };

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  //if (!auth._id) return <Navigate to="/signin" />;

  if (auth.role !== "admin") return <Navigate to="/signin" />;
  return (
    <>
      <Container component="main" maxWidth="lg" spacing={2}>
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
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="textPrimary">
                Indicator Manager
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
          <form
            encType="multipart/form-data"
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ marginBottom: "20px", marginTop: "100px" }}>
            <Grid container spacing={2}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-title"
                    select
                    label="Select type"
                    variant="outlined"
                    required
                    fullWidth
                    value={indicatorType}
                    onChange={(e) => setIndicatorType(e.target.value)}
                    inputRef={indicatorTypeRef}>
                    {Indicators.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    autoComplete="IndicatorName"
                    name="IndicatorName"
                    variant="outlined"
                    required
                    fullWidth
                    id="Indicator name"
                    label="Indicator name"
                    value={indicatorName}
                    onChange={(e) => setIndicatorName(e.target.value)}
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
          <CssBaseline />
          {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Indicator Type</TableCell>
                <TableCell align="left">Indicator name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {indicators.map((indicator) => (
                <TableRow
                  key={indicator._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {indicator.indicator_type}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {indicator.indicator_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        </div>
        {tableData.length > 1 ? (
          <div>
            <CacheProvider value={muiCache} style={{ margintop: "20px" }}>
              <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                  title={<Typography variant="h6">Indicators</Typography>}
                  data={tableData}
                  columns={columns}
                  options={options}
                  classes={{
                    row: {
                      root: classes.tableRow,
                    },
                  }}
                />
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
      </Container>
      <Dialog
        open={deleteDialogue}
        maxWidth="xs"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Do you wish to confirm delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Clicking on "Yes" willl delete the selected Indicators perminantly.
            Click "No" if you dont want to confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDeleteDialogClose}>
            No
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleConfirmDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogue}
        onClose={handleEditDialogClose}
        maxWidth="lg"
        PaperProps={{
          style: {
            maxWidth: false, // or a larger value, e.g. 800
            width: "50%",
            maxHeight: "80%",
            overflow: "auto",
          },
        }}>
        <DialogTitle>Edit Indicator name </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            id="outlined-select-title"
            label="Indicator name"
            required
            fullWidth
            value={editIndicatorName}
            onChange={(e) => seteditIndicatorName(e.target.value)}></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndicatorManager;
