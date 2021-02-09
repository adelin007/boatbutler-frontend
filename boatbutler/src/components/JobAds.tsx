import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        marginTop: "20px"
    },
    title: {
        marginBottom: "20px",
        color: "gray"
    },
    container:{
        marginLeft: "30px"
    },
    table: {
        
    },
    tableCellTitle:{
        color: "gray"
    },
    card: {
        // maxWidth: 350
        // marginLeft: "35px",
        // marginLeft: "35px",
        // marginRight: "35px"

    },
    media: {
        height: 300,
        margin: 0,
        // width: 300,
        padding: 0 // 16:9
        // margin: "auto"
    },
    cardTitle: {
        // marginLeft: "35px"
        color: "gray"
    }
});


const JobAds = () => {
    const classes = useStyles();
    const { jobsWithBoatDetails, fetchJobsWithBoatDetails } = useContext(UserContext);

    useEffect(() => {
        // fetch on first render
        fetchJobsWithBoatDetails();
    }, []);

    useEffect(() => {
        console.log("JOBS: ", jobsWithBoatDetails);
    }, [jobsWithBoatDetails]);


    return (
        <div className={classes.root}>
            {jobsWithBoatDetails && jobsWithBoatDetails.map((jobWithBoatDetails) => (
                <Grid container className={classes.container}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5" className={classes.title}>
                            Job Description
                    </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={3}>
                            <Grid container>
                                <Grid item xs={5} md={5} lg={5}>
                                {/* <Grid container>

                                </Grid> */}
                                USE LIST INSTEAD OF TABLE WITH KEY VALUE PAIRS SO WE CAN CONTROL THE HEIGHT
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableBody>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Boat Name
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.boat.name}</TableCell>

                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Boat Type
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.boat.boat_type}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Boat Location
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.boat.address}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Due Date
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.due_date}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Due Time
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.due_time}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Job Type
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.is_emergency ? "Emergency" : "Normal"}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Job Category
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.category}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Job Sub Category
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.subcategory}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Job Description
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.job.description}</TableCell>
                                            </TableRow>
                                            <TableRow key={jobWithBoatDetails.job._id}>
                                                <TableCell component="th" scope="row" className={classes.tableCellTitle}>
                                                    Preferred Contact
                                                    </TableCell>
                                                <TableCell align="right">{jobWithBoatDetails.user_contact_details}</TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </Table>
                                    <Grid container justify="center" style={{marginTop: "30px", marginBottom: "30px"}}>
                                         <Button style={{backgroundColor: "orange", color: "white"}}>Report User</Button>
                                    </Grid>

                             
                                </Grid>
                                <Grid item xs={1} md={1} lg={1}></Grid>
                                <Grid item xs={5} md={5} lg={5} >
                                    <Grid container alignContent="center" alignItems="center">
                                        <Grid item xs={12} md={12} lg={12}>
                                            <p className={classes.cardTitle}>
                                                Images / Videos
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Card className={classes.card}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={jobWithBoatDetails.job.job_media[0].url}
                                                    // image={"https://images.unsplash.com/photo-1511311855362-67f5492671ab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80"}
                                                    title="Paella dish"
                                                />
                                            </Card>

                                        </Grid>
                                        <Grid container justify="center">
                                            <Button style={{backgroundColor: "green", color: "white", marginRight: "20px"}}>
                                            Proposal
                                            </Button>
                                            <Button style={{backgroundColor: "red", color: "white"}}>
                                            Reject
                                            </Button>
                                        </Grid>

                                    </Grid>

                                   
                                </Grid>
                                <Grid item xs={1} md={1} lg={1}></Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            ))}
        </div>
    )
};

export default JobAds;