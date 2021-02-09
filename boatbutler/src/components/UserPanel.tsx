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
    Switch,
    withRouter
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./NavBar";
import DashboardHome from "./DashboardHome";
import JobAds from "./JobAds";


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
    menuList: {
        padding: "0",
        backgroundColor: "rgb(29,43,71)"
        //151 178 206
    },
    openMenuClass: {
        backgroundColor: "rgb(29,43,71)",
        height: "100vh"
    },
    closedMenuClass:{
        // backgroundColor: "white",
        height: "100vh"
    },
    menuLink: {
        textDecoration: "none",
        color: "black"
    },
    selectedListItem: {
        // color: "rgb(151, 178, 206)"
        backgroundColor: "rgb(151, 178, 206) !important",
        color: "rgb(29,43,71)"
    },
    unselectedListItem: {
        // rgba(0, 0, 0, 0.04)
        color: "rgb(151, 178, 206)"

    },
    btnTest: {
        justifyContent: "left"
    }

}));

enum DashboardMenuListValue {
    dashboard = "dashboard",
    jobads = "jobads",
    proposals = "proposals"
}


const UserPanel = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { loggedIn, logout } = useContext(UserContext);

    const [openMenu, setOpenMenu] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState(DashboardMenuListValue.jobads);

    useEffect(() => {
        // console.log("ROUTE PROPS: ", props);

        if (props.match) {
            const matchPath = props.match.path;
            if (matchPath) {
                switch (props.location.pathname) {
                    case `${matchPath}/${DashboardMenuListValue.jobads}`:
                        setSelectedMenuItem(DashboardMenuListValue.jobads);
                        break;
                    case `${matchPath}/${DashboardMenuListValue.proposals}`:
                        setSelectedMenuItem(DashboardMenuListValue.proposals);
                        break;
                    case `${matchPath}/${DashboardMenuListValue.dashboard}`:
                        setSelectedMenuItem(DashboardMenuListValue.dashboard);
                        break;
                    default:
                        setSelectedMenuItem(DashboardMenuListValue.jobads)
                }
            }

        }
    }, [props]);

    useEffect(() => {
        if (!loggedIn) {
            props.history.push("/login");
        }
    }, [loggedIn]);


    const handleClickToggleMenu = () => {
        setOpenMenu(prev => !prev)
    }

    return (
        <div>
            <Navbar onClickMenu={handleClickToggleMenu} />


            <Grid container>
                <Grid item xs={3} md={3} lg={3} className={openMenu ? classes.openMenuClass : classes.closedMenuClass}>

                    {openMenu && (<List className={classes.menuList}>
                        <Link
                            to={`/user/${DashboardMenuListValue.dashboard}`}
                            className={classes.menuLink}
                        >
                            <Button style={{ width: "100%", borderRadius: "0" }} classes={{ label: classes.btnTest }} className={selectedMenuItem === DashboardMenuListValue.dashboard ? classes.selectedListItem : classes.unselectedListItem}>
                                Dashboard
                            </Button>

                        </Link>
                        <Link
                            to={`/user/${DashboardMenuListValue.jobads}`}
                            className={classes.menuLink}
                        >
                            <Button style={{ width: "100%", borderRadius: "0" }} classes={{ label: classes.btnTest }} className={selectedMenuItem === DashboardMenuListValue.jobads ? classes.selectedListItem : classes.unselectedListItem}>
                                Job Ads
                            </Button>

                        </Link>
                    </List>)}

                </Grid>
                <Grid item xs={9} md={9} lg={9}>
                    <Switch>
                        <Route
                            exact
                            path={`${props.match.path}/${DashboardMenuListValue.dashboard}`}
                            component={DashboardHome}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/${DashboardMenuListValue.jobads}`}
                            component={JobAds}
                        />
                    </Switch>
                </Grid>
            </Grid>

        </div>
    )
}

export default withRouter(UserPanel)