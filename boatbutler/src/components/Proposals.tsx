import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "../context/UserContext";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    RouteComponentProps,
    Link,
    Switch,
    withRouter
} from "react-router-dom";


const Proposals = () => {
    const { proposals, fetchProposals } = useContext(UserContext);
    useEffect(() => {
        fetchProposals()
    }, []);


    return(
        <div>
            PROPOSALS
        </div>
    )
}


export default Proposals;