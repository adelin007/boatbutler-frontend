import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps,
    Link,
    Switch,
    withRouter
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./NavBar";
import DashboardHome from "./DashboardHome";
import JobAds from "./JobAds";
import Proposals from "./Proposals";
import Reviews from "./Reviews";
import CreateProposal from './CreateProposal';


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
    },
    openMenuClass: {
        backgroundColor: "rgb(29,43,71)",
        height: "300vh"
    },
    closedMenuClass: {
        height: "100vh"
    },
    menuLink: {
        textDecoration: "none",
        color: "black"
    },
    selectedListItem: {
        backgroundColor: "rgb(151, 178, 206) !important",
        color: "rgb(29,43,71)"
    },
    unselectedListItem: {
        color: "rgb(151, 178, 206)"

    },
    navButtonLabel: {
        justifyContent: "left",
    }

}));

enum DashboardMenuListValue {
    dashboard = "dashboard",
    jobads = "jobads",
    proposals = "proposals",
    reviews = "reviews"
}


const UserPanel = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { loggedIn } = useContext(UserContext);

    const [openMenu, setOpenMenu] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState(DashboardMenuListValue.jobads);

    useEffect(() => {
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
                    case `${matchPath}/${DashboardMenuListValue.proposals}`:
                        setSelectedMenuItem(DashboardMenuListValue.proposals);
                        break;
                    case `${matchPath}/${DashboardMenuListValue.reviews}`:
                        setSelectedMenuItem(DashboardMenuListValue.reviews);
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
                            <Button style={{ width: "100%", borderRadius: "0", textTransform: "none" }} classes={{ label: classes.navButtonLabel }} className={selectedMenuItem === DashboardMenuListValue.dashboard ? classes.selectedListItem : classes.unselectedListItem}>
                                Dashboard
                            </Button>

                        </Link>
                        <Link
                            to={`/user/${DashboardMenuListValue.jobads}`}
                            className={classes.menuLink}
                        >
                            <Button style={{ width: "100%", borderRadius: "0", textTransform: "none" }} classes={{ label: classes.navButtonLabel }} className={selectedMenuItem === DashboardMenuListValue.jobads ? classes.selectedListItem : classes.unselectedListItem}>
                                Job Ads
                            </Button>

                        </Link>
                        <Link
                            to={`/user/${DashboardMenuListValue.proposals}`}
                            className={classes.menuLink}
                        >
                            <Button style={{ width: "100%", borderRadius: "0", textTransform: "none" }} classes={{ label: classes.navButtonLabel }} className={selectedMenuItem === DashboardMenuListValue.proposals ? classes.selectedListItem : classes.unselectedListItem}>
                                Proposals
                            </Button>

                        </Link>
                        <Link
                            to={`/user/${DashboardMenuListValue.reviews}`}
                            className={classes.menuLink}
                        >
                            <Button style={{ width: "100%", borderRadius: "0", textTransform: "none" }} classes={{ label: classes.navButtonLabel }} className={selectedMenuItem === DashboardMenuListValue.reviews ? classes.selectedListItem : classes.unselectedListItem}>
                                Reviews
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
                        <Route
                            exact
                            path={`${props.match.path}/${DashboardMenuListValue.proposals}`}
                            component={Proposals}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/${DashboardMenuListValue.reviews}`}
                            component={Reviews}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/${DashboardMenuListValue.jobads}/createproposal`}
                            component={CreateProposal}
                        />
                    </Switch>
                </Grid>
            </Grid>

        </div>
    )
}

export default withRouter(UserPanel)