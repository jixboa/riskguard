import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Checkbox } from "@material-ui/core";
import { useForm } from "react-hook-form";

import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

//import { loadUser } from "../../store/actions/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { addScore, editScore } from "../../store/actions/scoreAction";
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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Select from "@material-ui/core/Select";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

/* import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper"; */

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import Slide from "@mui/material/Slide";
import MoonLoader from "react-spinners/MoonLoader";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 200;

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

const ScoreRanges = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "medium_high",
    label: "Medium High",
  },
  {
    value: "high",
    label: "High",
  },
];

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const ScoreManager = () => {
  const [scoreRange, setScoreRange] = useState("");
  const [scorePoint, setScorePoint] = useState("");
  const [editScorePoints, setEditScorePoints] = useState("");
  const [editScoreRange, setEditScoreRange] = useState("");
  const [editScoreID, setEditScoreID] = useState("");

  const [tableData, setTableData] = useState([]);

  const [editDialogue, setEditDialogueOpen] = useState(false);

  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const scores = useSelector((state) => state.scores);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    resetField,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  /*   const newTableData = scores.map((score) => [
    score.score_points,
    score.score_range,
    score._id,
  ]);
 */
  //setTableData(newTableData);

  useEffect(() => {
    const newTableData = scores.map((score) => [
      score.score_points,
      score.score_range,
      score._id,
    ]);

    setTableData(newTableData);
  }, [scores]);

  const handleEditDialogClose = () => setEditDialogueOpen(false);
  const handleEditDialogOpen = () => setEditDialogueOpen(true);

  const EditTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("score_point", scorePoint);
    formData.append("score_range", scoreRange);
    //console.log(formData);
    dispatch(addScore(formData));
  };

  const handleEdit = (score) => {
    const scorePoints = score[0];
    const ScoreRange = score[1];
    const ScoreID = score[2];

    setEditScorePoints(scorePoints);
    setEditScoreRange(ScoreRange);
    setEditScoreID(ScoreID);

    handleEditDialogOpen();
  };

  const handleUpdate = () => {
    ///console.log(editScoreID, editScoreRange);

    const updateData = {
      new_range: editScoreRange,
    };
    dispatch(editScore(updateData, editScoreID));

    handleEditDialogClose();
  };

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  const columns = [
    {
      name: "Score Points",
      options: {
        filterOptions: { fullWidth: true },
      },
    },
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
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 5,
    size: "small",
    search: true,
    download: true,
    print: true,
    filter: false,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
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

    /* customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div style={{ marginRight: "20px" }}>
        <MdDelete
          onClick={() => {
            const selectedIds = selectedRows.data.map(
              (item) => tableData[item.index][8]
            );
            handleDeleteRows(selectedIds);
            setSelectedRows([]);
          }}
        />
      </div>
    ), */
  };
  //if (!auth._id) return <Navigate to="/signin" />;
  //console.log(auth);

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
                Score Manager
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
                    name="scorePoint"
                    variant="outlined"
                    required
                    fullWidth
                    id="score point"
                    label="score point"
                    value={scorePoint}
                    onChange={(e) => setScorePoint(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-select-title"
                    select
                    label="Select type"
                    variant="outlined"
                    required
                    fullWidth
                    value={scoreRange}
                    onChange={(e) => setScoreRange(e.target.value)}>
                    {ScoreRanges.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
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
          {/*    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="dense table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Score points</TableCell>
                  <TableCell align="left">Score range</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scores.map((score) => (
                  <TableRow
                    key={score._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="td" scope="row">
                      {score.score_points}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {score.score_range}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <EditOutlinedIcon onClick={() => handleEdit(score)} />
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
                  title={<Typography variant="h6">Scores Range</Typography>}
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
      <Dialog open={editDialogue} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Score point ({editScorePoints})</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            id="outlined-select-title"
            select
            label="Select Range"
            required
            fullWidth
            value={editScoreRange}
            onChange={(e) => setEditScoreRange(e.target.value)}>
            {ScoreRanges.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScoreManager;
