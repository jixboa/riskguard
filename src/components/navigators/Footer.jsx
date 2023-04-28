import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
//import { Security, Info } from "@material-ui/icons";

const Footer = () => (
  <>
    <AppBar
      position="static"
      bottom={0}
      elevation={0}
      component="footer"
      color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">Copyright@Risk Guardian</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
