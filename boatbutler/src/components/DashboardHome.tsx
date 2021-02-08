import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "./CustomInput";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    RouteComponentProps,
    Link,
    withRouter
  } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./NavBar";


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


const Dashboard = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { loggedIn } = useContext(UserContext);

    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if(!loggedIn){
            props.history.push("/login");
        }
    }, [loggedIn]);


    const handleClickToggleMenu = () => {
        setOpenMenu(prev => !prev)
    }

    return(
        <div>
            <Navbar onClickMenu={handleClickToggleMenu}/>
            
                
                    <Grid container>
                        <Grid item xs={3} md={3} lg={3}>
    
                        {openMenu && (<List>
                            <Link
                                to="/"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                <Tooltip title="Dashboard" aria-label="dashboard">
                                    <MenuItem
                                        button
                                        selected={
                                        props.match.isExact
                                        }
                                    >
                                        {/* <ListItemIcon>
                                        <AppsIcon />
                                        </ListItemIcon> */}
                                        <ListItemText primary="Dashboard" />
                                        
                                    </MenuItem>
                                </Tooltip>
                            </Link>
                        </List>)}
        
                        </Grid>
                        <Grid item xs={9} md={9} lg={9}>
                            CONTENT            
                        </Grid>
                    </Grid>
                

                
               

          
       

        </div>
    )
}

export default withRouter(Dashboard)