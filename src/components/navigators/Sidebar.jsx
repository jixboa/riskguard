import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { makeStyles } from "@material-ui/core";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authAction";

import MailIcon from "@mui/icons-material/Mail";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonIcon from "@mui/icons-material/Person";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import riskLogo from "../../docs/guardian.png";

const drawerWidth = 200;

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

const useStyle = makeStyles({
  root: {
    flexGrow: 1,
    margin: "0px auto",
  },
  appbarStyle: {
    background: "#d4d6d5",
  },

  linkStyle: {
    color: "#16315c",
    textDecoration: "none",
  },
  a: {
    textDecoration: "none",
  },
  mylist: {
    display: "flex",
    alignItems: "left",
    height: "50px",
    padding: "0 5px",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  },
  mylistHover: {
    backgroundColor: "#f0f0f0",
  },
  mylistIcon: {
    marginRight: "10px",
  },
  mylistText: {
    fontSize: "16px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mylistSelected: {
    backgroundColor: "#c8cccb",
    color: "#ffffff",
  },
});

export default function Sidebar() {
  const classes = useStyle();
  const auth = useSelector((state) => state.auth);
  const [selected, setSelectedItem] = useState(null);

  const [showSubMenu, setShowSubMenu] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClicked = () => {
    setShowSubMenu(!showSubMenu);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  const handleItemClick = (itemLabel) => {
    setSelectedItem(itemLabel);
  };

  //if (!auth._id) return <Navigate to="/signin" />;

  return (
    <>
      {auth._id ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                },
              }}
              variant="permanent"
              anchor="left">
              <Paper style={{ backgroundColor: "#e9f1ef", height: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "7px",
                  }}>
                  <Link to="/">
                    <img src={riskLogo} alt="Logo" style={{ height: "50px" }} />
                  </Link>
                </div>
                <Toolbar />
                <List>
                  <ListItem
                    disablePadding
                    className={`${classes.mylist} ${
                      selected === "indprofiler" ? classes.mylistSelected : ""
                    }`}
                    onClick={() => handleItemClick("indprofiler")}>
                    <Link className={classes.linkStyle} to="/indprofiler">
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonRoundedIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.mylistText}>
                          <Typography variant="h4" className={classes.root}>
                            <Typography fontSize={13}>
                              Individual Profiler
                            </Typography>
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>

                  <ListItem
                    disablePadding
                    className={`${classes.mylist} ${
                      selected === "corprofiler" ? classes.mylistSelected : ""
                    }`}
                    onClick={() => handleItemClick("corprofiler")}>
                    <Link className={classes.linkStyle} to="/corprofiler">
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.mylistText}>
                          <Typography variant="h4" className={classes.root}>
                            <Typography fontSize={13}>
                              Corporate Profiler
                            </Typography>
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </List>

                {auth.role == "admin" ? (
                  <>
                    <List>
                      <ListItem
                        disablePadding
                        className={`${classes.mylist} ${
                          selected === "scores" ? classes.mylistSelected : ""
                        }`}
                        onClick={() => handleItemClick("scores")}>
                        <Link className={classes.linkStyle} to="/scores">
                          <ListItemButton>
                            <ListItemIcon>
                              <CreditScoreIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.mylistText}>
                              <Typography variant="h4" className={classes.root}>
                                <Typography fontSize={13}>
                                  Score Manager
                                </Typography>
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem
                        disablePadding
                        className={`${classes.mylist} ${
                          selected === "indicators"
                            ? classes.mylistSelected
                            : ""
                        }`}
                        onClick={() => handleItemClick("indicators")}>
                        <Link className={classes.linkStyle} to="/indicators">
                          <ListItemButton>
                            <ListItemIcon>
                              <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.mylistText}>
                              <Typography variant="h4" className={classes.root}>
                                <Typography fontSize={13}>
                                  Indicator Manager
                                </Typography>
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem
                        disablePadding
                        className={`${classes.mylist} ${
                          selected === "items" ? classes.mylistSelected : ""
                        }`}
                        onClick={() => handleItemClick("items")}>
                        <Link className={classes.linkStyle} to="/items">
                          <ListItemButton>
                            <ListItemIcon>
                              <ArchiveIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.mylistText}>
                              <Typography variant="h4" className={classes.root}>
                                <Typography fontSize={13}>
                                  Items Manager
                                </Typography>
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    </List>

                    <List>
                      <ListItem
                        disablePadding
                        className={`${classes.mylist} ${
                          selected === "signup" ? classes.mylistSelected : ""
                        }`}
                        onClick={() => handleItemClick("signup")}>
                        <Link className={classes.linkStyle} to="/signup">
                          <ListItemButton>
                            <ListItemIcon>
                              <PersonOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.mylistText}>
                              <Typography variant="h4" className={classes.root}>
                                <Typography fontSize={13}>
                                  User Manager
                                </Typography>
                              </Typography>
                            </ListItemText>
                          </ListItemButton>
                        </Link>
                      </ListItem>
                      <ListItem disablePadding onClick={handleItemClicked}>
                        <ListItemButton>
                          <ListItemIcon>
                            <PersonOutlineOutlinedIcon />
                          </ListItemIcon>
                          <>
                            <>
                              <Button
                                id="demo-customized-button"
                                aria-controls={
                                  open ? "demo-customized-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                variant="text"
                                disableElevation
                                onClick={handleClick}
                                endIcon={<KeyboardArrowDownIcon />}
                                /* style={{ color: "grey" }} */
                              >
                                <Typography
                                  variant="caption"
                                  fontWeight="normal"
                                  className={classes.linkStyle}>
                                  Reports
                                </Typography>
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
                              <MenuItem onClick={handleClose} disableRipple>
                                <CreditScoreIcon />
                                <Link
                                  className={classes.linkStyle}
                                  to="/scores">
                                  Score Manager
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <FileCopyIcon />
                                <Link
                                  className={classes.linkStyle}
                                  to="/indicators">
                                  Indicator Manager
                                </Link>
                              </MenuItem>
                              <Divider sx={{ my: 0.5 }} />
                              <MenuItem onClick={handleClose} disableRipple>
                                <ArchiveIcon />
                                <Link className={classes.linkStyle} to="/items">
                                  Items Manager
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <PersonIcon />
                                <Link
                                  className={classes.linkStyle}
                                  to="/signup">
                                  Users
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose} disableRipple>
                                <MoreHorizIcon />
                                Reports
                              </MenuItem>
                            </StyledMenu>
                          </>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <></>
                )}

                <List
                  style={{
                    position: "absolute",
                    bottom: 0,
                    marginTop: "50px",
                  }}>
                  <ListItem>
                    <ListItemButton>
                      <Button
                        variant="text"
                        style={{ color: "#16315c" }}
                        onClick={() => HandleSignOut()}>
                        SignOut
                      </Button>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </Drawer>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
