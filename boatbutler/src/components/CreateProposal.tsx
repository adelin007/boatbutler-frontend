import React, { useEffect, useContext, useState } from "react";
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
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    RouteComponentProps,
    Link,
    Switch,
    withRouter
} from "react-router-dom";


import {ProposalDetails} from ".././context/UserContext";

const useStyles = makeStyles({
    root: {
        marginTop: "20px"
    },
    title: {
        marginBottom: "20px",
        color: "gray"
    },
    container: {
        marginLeft: "30px"
    },
    table: {

    },
    tableCellTitle: {
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
    listItemSecondaryText: {

    }
});

const initialProposalDetails: ProposalDetails={
    jobId: "",
    date: "",
    time: "",
    text: "",
    fixedPrice: false,
    price: 1
}

const CreateProposal = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { jobsWithBoatDetails, fetchJobsWithBoatDetails, selectJobAdId, selectedJobAdId, postProposal } = useContext(UserContext);
    const [proposalDetails, setProposalDetails ] = useState<ProposalDetails>(initialProposalDetails);
    const [validProposalDetails, setValidProposalDetails]  = useState(false);
    
    useEffect(() => {
        if(selectedJobAdId){
            setProposalDetails({...proposalDetails, jobId: selectedJobAdId});
        }
    }, [selectedJobAdId]);

    useEffect(() => {
        console.log("Proposal details: ", proposalDetails);
        if(!proposalDetails || !proposalDetails.jobId || !proposalDetails.date || !proposalDetails.text || !proposalDetails.time || Number.isNaN(proposalDetails.price) || proposalDetails.price <= 0){
            setValidProposalDetails(false);
        } else {
            setValidProposalDetails(true);
        }
    }, [proposalDetails]);

    // useEffect(() => {
    //     // fetch on first render
    //     fetchJobsWithBoatDetails();
    // }, []);

    // useEffect(() => {
    //     console.log("JOBS: ", jobsWithBoatDetails);
    // }, [jobsWithBoatDetails]);


    const handleGoBackToJobAds = () => {
        props.history.push("/user/jobads");

    }
    const handleChangeFixedPrice = () => {
        setProposalDetails({...proposalDetails, fixedPrice: !proposalDetails.fixedPrice})
    }
    const handleChangeProposalDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("CLICK ON: ", e.target.name);
        if (proposalDetails) {
          switch (e.target.name) {
            case "date":
              setProposalDetails({ ...proposalDetails, date: e.target.value });
              break;
            case "time":
                setProposalDetails({ ...proposalDetails, time: e.target.value });
              break;
            case "text":
                setProposalDetails({ ...proposalDetails, text: e.target.value });
              break;
            case "price":
                setProposalDetails({ ...proposalDetails, price: Number.parseInt(e.target.value) });
              break;   
          }
        }
    }

    const handleClickSubmitProposal = async() => {
            if(proposalDetails && validProposalDetails){
                await postProposal(proposalDetails);
                props.history.push("/user/jobads");
            }
    }

    return (
        <div className={classes.root}>
            {jobsWithBoatDetails && jobsWithBoatDetails.filter(jobWithDetails=> jobWithDetails.job._id === selectedJobAdId).map((jobWithBoatDetails) => (
                <Grid container className={classes.container}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5" className={classes.title}>
                            Create A Job Proposal
                    </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Paper elevation={3}>
                            <Grid container>
                                <Grid item xs={5} md={5} lg={5} style={{ marginBottom: "20px" }}>
                                    <p style={{ paddingLeft: "36px" }}>Job Overview</p>
                                    <List dense aria-label="jobadsList" className={classes.list}>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Boat Name" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.boat.name} />
                                                </Grid>
                                            </Grid>

                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Boat Type" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.boat.boat_type} />
                                                </Grid>
                                            </Grid>

                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Boat Location" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.boat.address} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Due Date" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.due_date} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Due Time" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.due_time} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Job Type" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.is_emergency ? "Emergency" : "Normal"} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Job Category" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.category} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Job Sub Category" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.subcategory} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Job Description" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.job.description} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <Grid container >
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary="Preffered Contact" className={classes.listItemMainText} />
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} >
                                                    <ListItemText primary={jobWithBoatDetails.user_contact_details} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </List>

                                </Grid>
                                <Grid item xs={1} md={1} lg={1}></Grid>
                                <Grid item xs={5} md={5} lg={5} style={{ marginTop: "30px" }}>
                                    <Grid container>
                                        <Grid item xs={6} md={6} lg={6} justify="center">
                                            <TextField
                                                id="proposal-date"
                                                label="Date"
                                                type="date"
                                                name="date"
                                                error={!proposalDetails || !proposalDetails.date}
                                                placeholder="Select Date"
                                                value={proposalDetails.date}
                                                onChange={handleChangeProposalDetails}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6} justify="center" >
                                            <TextField
                                                id="proposal-time"
                                                label="Time"
                                                type="time"
                                                name="time"
                                                value={proposalDetails.time}
                                                error={!proposalDetails || !proposalDetails.time}
                                                onChange={handleChangeProposalDetails}
                                                placeholder="Select Time"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid container style={{ marginTop: "30px" }}>
                                        <TextField
                                            id="proposal-text"
                                            multiline
                                            fullWidth
                                            rows={5}
                                            variant="outlined"
                                            placeholder="Proposal Text"
                                            name="text"
                                            value={proposalDetails.text}
                                            error={!proposalDetails || !proposalDetails.text}
                                            onChange={handleChangeProposalDetails}    
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid container style={{ marginTop: "10px" }}>
                                        <TextField
                                            id="proposal-price"
                                            type="number"
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Proposal Price"
                                            name="price"
                                            value={proposalDetails.price}
                                            error={!proposalDetails || Number.isNaN(proposalDetails.price) || proposalDetails.price <= 0 }
                                            onChange={handleChangeProposalDetails}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid container style={{ marginTop: "10px" }}>

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={proposalDetails.fixedPrice}
                                                    onChange={() => handleChangeFixedPrice()}
                                                    name="fixedPrice"
                                                    color="primary"
                                                />
                                            }
                                            label="Price is Fixed"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={!proposalDetails.fixedPrice}
                                                    onChange={() => handleChangeFixedPrice()}
                                                    name="negociablePrice"
                                                    color="primary"
                                                />
                                            }
                                            label="Price is Negociable"
                                        />

                                    </Grid>
                                    <Grid container justify="center" style={{ marginTop: "20px", }}>
                                        <Button onClick={() => handleGoBackToJobAds()} style={{ backgroundColor: "rgb(220, 219, 220)", textTransform: "none", height: "25px", width: "135px", marginRight: "10px" }}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleClickSubmitProposal()} color="primary" variant="contained" disabled={!validProposalDetails} style={{ textTransform: "none", height: "25px", width: "135px" }}>
                                            Submit
                                        </Button>

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

export default withRouter(CreateProposal);