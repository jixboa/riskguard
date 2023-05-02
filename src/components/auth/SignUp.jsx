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
import { LockOutlined, SettingsAccessibility } from "@mui/icons-material";
import { Container } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { AppBar, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit, Delete } from "@material-ui/icons";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
  searchField: {
    width: 200,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: "50px",
  },
  item: {
    flex: "none",
    marginBottom: theme.spacing(1),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
  actionColumn: {
    width: 80,
    textAlign: "center",
  },
  root: {
    textAlign: "center",
    display: "flex",
    margin: "auto",
    alignItems: "flex-end",
    maxWidth: 800,
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
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  },

  cancel: {
    margin: theme.spacing(3, 0, 2),

    color: "white",
  },

  appbarStyle: {
    background: "#f2f9f8",
    elevation: 0,
  },
}));

const itemsPerPage = 5;

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
  const users = useSelector((state) => state.users);
  /*   console.log(auth);
  console.log(users); */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    setPage(1); // reset page to 1 when searching
  };

  const filteredItems = users.filter((user) =>
    user.fname.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  const handleCancel = () => {
    setShowForm(false);
  };

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  if (auth.role !== "admin") return <Navigate to="/signin" />;

  return (
    <Container component="main" className={classes.container} maxWidth="sm">
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
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.item}>
          <Box mt={2}>
            {!showForm && (
              <>
                <div className={classes.search}>
                  <TextField
                    label="Search"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    className={classes.searchField}
                    size="small"
                  />
                </div>
                <List>
                  {displayedItems.map((user) => (
                    <React.Fragment key={user._id}>
                      <ListItem className={classes.listItem}>
                        <ListItemAvatar>
                          <Avatar src={user.fname} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.fname}
                          secondary={user.role}
                        />
                        <div className={classes.actionsColumn}>
                          <IconButton href={user._id}>
                            <Edit />
                          </IconButton>
                          <IconButton href={user._id}>
                            <Delete />
                          </IconButton>
                        </div>
                      </ListItem>
                      <Divider variant="inset" />
                    </React.Fragment>
                  ))}
                </List>

                <div
                  className={classes.pagination}
                  style={{ marginBottom: "20px" }}>
                  <Pagination
                    count={Math.ceil(filteredItems.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setShowForm(true)}>
                  Add User
                </Button>
              </>
            )}
            {showForm && (
              <Box mt={2}>
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
                          onChange={(e) =>
                            setUser({ ...user, fname: e.target.value })
                          }
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
                          onChange={(e) =>
                            setUser({ ...user, lname: e.target.value })
                          }
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
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
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
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
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
                      <Grid item xs={12} sm={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}>
                          Add
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          type="cancel"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={handleCancel}
                          className={classes.cancel}>
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className={classes.linkStyle} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
                  </form>
                </div>
              </Box>
            )}
          </Box>
        </div>
        {/* Add more items as needed */}
      </Container>
    </Container>
  );
};

export default SignUp;
