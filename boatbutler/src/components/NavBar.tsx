import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "./CustomInput";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    RouteComponentProps,
    withRouter
  } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },

}));

interface NavBarProps{
  onClickMenu? : () => void;
}

const NavBar = (props: NavBarProps) => {
    const classes = useStyles();
    const { logout } = useContext(UserContext);
    const {onClickMenu} = props;

    return(
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NJORD
          </Typography>
          <Button color="inherit" onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default NavBar