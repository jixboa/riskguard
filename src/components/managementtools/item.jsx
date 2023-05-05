import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Checkbox } from "@material-ui/core";
import { useForm } from "react-hook-form";

import { loadUser } from "../../store/actions/authAction";
import { addItem, deleteItem, editItem } from "../../store/actions/itemAction";

import { makeStyles } from "@material-ui/core/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "../../store/actions/authAction";

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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
//import Fade from "@mui/material/Fade";
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

  appbarStyle: {
    background: "#f2f9f8",
    elevation: 0,
  },
  root: {
    "& .MuiTableRow-root:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: "transparent",
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(2, 2),
    },
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
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

const ItemsManager = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const indicators = useSelector((state) => state.indicators);
  const items = useSelector((state) => state.items);
  const scores = useSelector((state) => state.scores);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [indicatorType, setIndicatorType] = useState("");
  const [indicatorName, setIndicatorName] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");

  const [editItemDescription, setEditItemDescription] = useState("");
  const [editItemScore, seteditItemScore] = useState("");
  const [editItemId, seteditItemId] = useState("");

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

  // console.log(auth)

  const {
    resetField,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const itemsWithScoreNames = items.map((item) => ({
    ...item,
    score_name:
      scores.find((score) => score.score_points === parseInt(item.score, 10))
        ?.score_range || "Unknown",
  }));

  useEffect(() => {
    const newTableData = itemsWithScoreNames.map((item) => [
      item.indicator_type,
      item.indicator_name,
      item.item_description,
      item.score,
      item.score_name,
      item._id,
    ]);

    setTableData(newTableData);
  }, [items]);

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("indicator_type", indicatorType);
    formData.append("indicator_name", indicatorName);
    formData.append("description", description);
    formData.append("score", score);

    dispatch(addItem(formData));
  };

  const handleEdit = (indicator) => {
    const itemDescription = indicator[2];
    const itemScore = indicator[3];
    const itemId = indicator[5];

    setEditItemDescription(itemDescription);
    seteditItemScore(itemScore);
    seteditItemId(itemId);

    handleEditDialogOpen();
  };

  const handleUpdate = () => {
    ///console.log(editScoreID, editScoreRange);

    const updateData = {
      description: editItemDescription,
      score: editItemScore,
    };
    //console.log(updateData);
    dispatch(editItem(updateData, editItemId));

    handleEditDialogClose();
  };

  const handleDeleteRows = (rowsDeleted) => {
    const itemsToDelete = rowsDeleted;
    setItemToDelete(itemsToDelete);

    handleDeleteDialogueOpen();
  };

  const handleConfirmDelete = () => {
    // console.log(itemToDelete);
    dispatch(deleteItem(itemToDelete));
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
    "Description",
    "Score",
    "Score Range",
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
              (item) => tableData[item.index][5]
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
                Items Manager
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
                    onChange={(e) => setIndicatorType(e.target.value)}>
                    {Indicators.map((option) => (
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
                    label="Select Indicator"
                    variant="outlined"
                    required
                    fullWidth
                    value={indicatorName}
                    onChange={(e) => setIndicatorName(e.target.value)}>
                    {indicators
                      .filter((indicator) =>
                        indicator.indicator_type.includes(indicatorType)
                      )
                      .map((indicator) => (
                        <MenuItem
                          key={indicator._id}
                          value={indicator.indicator_name}>
                          {indicator.indicator_name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={10}>
                  <TextField
                    name="description"
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Indicator Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="outlined-select-title"
                    select
                    label="Score"
                    variant="outlined"
                    required
                    fullWidth
                    value={score}
                    onChange={(e) => setScore(e.target.value)}>
                    {scores.map((score) => (
                      <MenuItem key={score._id} value={score.score_points}>
                        {score.score_points}
                      </MenuItem>
                    ))}
                  </TextField>
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
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Score</TableCell>
                  <TableCell align="left">Score Range</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsWithScoreNames.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {item.indicator_type}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.indicator_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.item_description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.score}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.score_name}
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
        PaperProps={{
          style: {
            maxWidth: false, // or a larger value, e.g. 800
            width: "50%",
          },
        }}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <h3>Edit Description and score</h3>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-title"
                  label="Description"
                  required
                  variant="outlined"
                  fullWidth
                  value={editItemDescription}
                  onChange={(e) =>
                    setEditItemDescription(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-title"
                  select
                  label="Score"
                  variant="outlined"
                  required
                  fullWidth
                  value={editItemScore}
                  onChange={(e) => seteditItemScore(e.target.value)}>
                  {scores.map((score) => (
                    <MenuItem key={score._id} value={score.score_points}>
                      {score.score_points}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemsManager;
