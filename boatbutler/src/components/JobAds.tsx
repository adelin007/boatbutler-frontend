import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from '@material-ui/core/ListItem';


import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    RouteComponentProps,
    withRouter
} from "react-router-dom";

const useStyles = makeStyles({
    root:{
        marginTop: "20px",
    },
    title: {
        marginBottom: "20px",
        color: "gray"
    },
    container:{
        marginLeft: "30px", 
    },
    table: {
    },
    tableCellTitle:{
        color: "gray"
    },
    card: {

    },
    media: {
        height: 300,
        margin: 0,
        padding: 0 
    },
    cardTitle: {
        // marginLeft: "35px"
        color: "gray"
    },
    list: {
        paddingLeft: "20px",
    },
    listItem: {
        borderBottom: "1px solid lightgray",
        
    },
    listItemMainText: {
        color: "gray"
    },
    listItemSecondaryText:{

    }
});

const JobAds = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { jobsWithBoatDetails, fetchJobsWithBoatDetails, selectJobAdId, selectedJobAdId } = useContext(UserContext);

    useEffect(() => {
        // fetch on first render
        fetchJobsWithBoatDetails();
    }, []);

    useEffect(() => {
        console.log("JOBS: ", jobsWithBoatDetails);
    }, [jobsWithBoatDetails]);

    const onClickMakeProposal = (jobId: string) => {
            console.log("GONNA PROPOSE TO: ", jobId);
            if(jobId){
                selectJobAdId(jobId);
                if(props && props.match && props.match.path){
                    props.history.push(`${props.match.path}/createproposal`);
                }
            }
    }
    return (
        <div className={classes.root}>
        <Grid container >
            <Grid item xs={1} md={1} lg={1}></Grid>
            <Grid item xs={10} md={10} lg={10}>
                <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5" className={classes.title}>
                                Job Description
                        </Typography>
                 </Grid>
            {jobsWithBoatDetails && jobsWithBoatDetails.map((jobWithBoatDetails) => (
                <Grid container style={{marginTop: "20px"}}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={3}>
                            <Grid container>
                                <Grid item xs={5} md={5} lg={5}>
                                     <List dense aria-label="jobadsList" className={classes.list}>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Boat Name" className={classes.listItemMainText}/>
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.boat.name} />
                                                </Grid>
                                            </Grid>
  
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                    <Grid item xs={6} md={6} lg={6} >
                                                        <ListItemText primary="Boat Type" className={classes.listItemMainText}/>
                                                    </Grid>
                                                    <Grid item xs={6} md={6} lg={6} >
                                                        <ListItemText primary={jobWithBoatDetails.boat.boat_type} />
                                                    </Grid>
                                            </Grid>
                        
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Boat Location" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.boat.address} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Due Date" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.due_date} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Due Time" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.due_time} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Job Type" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.is_emergency ? "Emergency" : "Normal"} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Job Category" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.category} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Job Sub Category" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.subcategory} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Job Description" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.job.description} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary="Preffered Contact" className={classes.listItemMainText}/>    
                                                        </Grid>
                                                        <Grid item xs={6} md={6} lg={6} >
                                                            <ListItemText primary={jobWithBoatDetails.user_contact_details} />
                                                        </Grid>
                                            </Grid>
                                        </ListItem>
                                     </List>



                                    <Grid container justify="center" style={{marginTop: "30px", marginBottom: "30px"}}>
                                         <Button style={{backgroundColor: "orange", color: "white", marginRight: "20px", textTransform: "none", height: "25px", width: "135px"}}>Report User</Button>
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
                                        <Grid container justify="center" style={{marginTop: "15%"}}>
                                            <Button onClick={() => onClickMakeProposal(jobWithBoatDetails.job._id)} style={{backgroundColor: "green", color: "white", marginRight: "20px", textTransform: "none", height: "25px", width: "135px"}}>
                                           Make A Proposal
                                            </Button>
                                            <Button style={{backgroundColor: "red", color: "white", marginRight: "20px", textTransform: "none", height: "25px", width: "135px"}}>
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
            </Grid>
            <Grid item xs={1} md={1} lg={1}></Grid>
            
            </Grid>
        </div>
    )
};

export default withRouter(JobAds);