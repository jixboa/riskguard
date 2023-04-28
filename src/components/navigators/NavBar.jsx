import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authAction";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

import { AppBar, Typography, Toolbar, makeStyles } from "@material-ui/core";

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
});

const NavBar = () => {
  const classes = useStyle();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSignOut = () => {
    //signOut the user
    dispatch(signOut());
    navigate("/signin");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar>
          <Typography variant="h4" className={classes.root}>
            <Link className={classes.linkStyle} to="/">
              <Typography>Risk Guardian</Typography>
            </Link>
          </Typography>
          {auth._id ? (
            <>
              <>
                <Button variant="text" color="inherit">
                  <Link className={classes.linkStyle} to="/indprofiler">
                    Individual Profiler
                  </Link>
                </Button>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button variant="text" color="inherit">
                  <Link className={classes.linkStyle} to="/corprofiler">
                    Corporate Profiler
                  </Link>
                </Button>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="text"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  style={{ color: "#16315c" }}>
                  Admin
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
                  <Link className={classes.linkStyle} to="/scores">
                    <CreditScoreIcon />
                    Score Manager
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <Link className={classes.linkStyle} to="/indicators">
                    <FileCopyIcon />
                    Indicator Manager
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <Link className={classes.linkStyle} to="/items">
                    <ArchiveIcon />
                    Items Manager
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <Link className={classes.linkStyle} to="/signup">
                    <PersonIcon />
                    Users
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  Reports
                </MenuItem>
              </StyledMenu>

              <Button
                style={{ color: "#16315c" }}
                variant="text"
                onClick={() => HandleSignOut()}>
                SignOut
              </Button>
            </>
          ) : (
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
                  style={{ color: "#16315c" }}>
                  Admin
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
                  <Link className={classes.linkStyle} to="/scores">
                    Score Manager
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <FileCopyIcon />
                  <Link className={classes.linkStyle} to="/indicators">
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
                  <Link className={classes.linkStyle} to="/signup">
                    Users
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  Reports
                </MenuItem>
              </StyledMenu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* <Button variant="contained">Hello World</Button> */}
    </>
  );
};

export default NavBar;
