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
    RouteComponentProps
  } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        width: "100%",
        height: "100%",
        backgroundImage: `url("https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80")`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        background: "white",
        alignItems: "center"
    },
    paper: {
        // maxWidth: "330px",
        margin: "auto"
    },
    form: {
        maxWidth: "330px",
        margin: " 0 auto",
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: "20px",
        marginTop: "30px"
    },
    title: {
        color: "gray",
        marginTop: "30px",
        textAlign: "center"
    },
    logoDiv: {
        backgroundColor: "rgb(29, 43, 71)",
        display: "flex",
        justifyContent: "center"
    },
    loginButton: {
        marginTop: "50px",
        backgroundColor: "rgb(240, 203, 103)",
        color: "white"
    },
    formLabel: {

    },
    formGroup: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    terms: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px" 
    }
}));


export const Login = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { test, loggedIn, fetchAuthToken } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidInput, setIsValidInput] = useState(false);

    useEffect(() => {
        if(loggedIn){
            props.history.push("/user/jobads");
        }
    }, [loggedIn]);


    useEffect(() => {
        if(!email || !password){
            setIsValidInput(false);
        } else {
            setIsValidInput(true);
        }
    }, [email, password]);


    const handleChangeEmail = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const onClickLogin = async() => {
        await fetchAuthToken(email, password);
    }


    return (
        <div className={classes.root}>  
        
        <Paper elevation={2} className={classes.paper}>
            <div className={classes.logoDiv}>
                <p style={{color: "white", fontStyle:"italic", fontSize: "24px", fontWeight: 500}}>NJORD</p>
            </div>
            <Typography variant="h4" className={classes.title}>
                Company Login
            </Typography>
            <form className={classes.form}>
                <CustomInput labelText="email" id="email" type="text" handleChange={handleChangeEmail} value={email} />
                <CustomInput labelText="password" id="password" type="password" handleChange={handleChangePassword} value={password}/>
                <div className={classes.formGroup}>
                    <Checkbox
                        name="test"
                    />
                    <p>Remember me</p>
                    <p style={{ marginLeft: "20px" }}>Forgot password?</p>
                </div>
                <Button type="button" color="primary" className={classes.loginButton} disabled={!isValidInput} onClick={onClickLogin}>
                    Sign in
                </Button>
                <div className={classes.terms}>
                    <Link>Terms & Conditions</Link>
                </div>
            </form>
        </Paper>

        </div>
    )
}


