import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";
import { withRouter } from "react-router-dom";
import { BOAT_BUTLER_API, JobWithBoatDetails } from "../utils/definitions";

export enum AppStateType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}
export interface AppState {
  message: string;
  type: AppStateType;
}
interface TokenBody {
  token: string;
}
export interface ProposalDetails {
  jobId: string;
  date: string;
  time: string;
  text: string;
  price: number;
  fixedPrice: boolean;
}
export interface Proposal {
  id: string;
  status: string;
  date: string;
  time: string;
  description: string;
  negotiable: boolean;
  job_id: string;
  company_id: string;
  price: number;
}
type ContextProps = {
  test: string,
  loggedIn: boolean,
  logout: () => void;
  fetchAuthToken: (email: string, password: string) => Promise<void>;
  fetchJobsWithBoatDetails: () => Promise<void>;
  selectedJobAdId: string | undefined;
  selectJobAdId: (jobId: string) => void;
  jobsWithBoatDetails: JobWithBoatDetails[] | undefined;
  postProposal: (proposalDetails: ProposalDetails) => Promise<void>;
  fetchProposals: () => void;
  proposals: Proposal[] | undefined,
  appState: AppState | undefined
  resetAppState: () => void;

}
export const UserContext = createContext({} as ContextProps);

const UserProvider = (props: any) => {

  const [token, setToken] = useState(() => (window.localStorage.getItem("token") ? window.localStorage.getItem("token") : null));
  const [loggedIn, setLoggedIn] = useState(() => {
    if (token) {
      return true;
    } else {
      return false;
    }
  });

  const [jobsWithBoatDetails, setJobsWithBoatDetails] = useState<JobWithBoatDetails[]>();
  const [selectedJobAdId, setSelectedJobAdId] = useState<string | undefined>();
  const [proposals, setProposals] = useState<Proposal[] | undefined>();
  const [appState, setAppState] = useState<AppState | undefined>();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      window.localStorage.setItem("token", token);
    } else {
      setLoggedIn(false);
    }
  });

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  const fetchAuthToken = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Invalid inputs")
      }
      const response = await axios.post(`${BOAT_BUTLER_API}/api/login`, {
        email: email,
        password: password
      });
      if (response.status === 200) {
        const tokenBody: TokenBody = response.data;
        if (tokenBody) {
          setToken(tokenBody.token);
          const newAppState: AppState = {
            type: AppStateType.SUCCESS,
            message: "Logged in"
          }
          setAppState(newAppState);

        }

      }
    } catch (error) {
      const newAppState: AppState = {
        type: AppStateType.ERROR,
        message: "Login Error"
      }
      setAppState(newAppState);
    }
  };

  const postProposal = async (proposalDetails: ProposalDetails) => {
    try {
      const response = await axios.post(`${BOAT_BUTLER_API}/api/company/proposals/new`, proposalDetails, {
        headers: { Authorization: "bearer " + token },
      });
      if (response.status === 200) {
        const newAppState: AppState = {
          type: AppStateType.SUCCESS,
          message: "Proposal created"
        }
        setAppState(newAppState);
      }

    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        logout();
      }
      const newAppState: AppState = {
        type: AppStateType.ERROR,
        message: "Fetch Error"
      }
      setAppState(newAppState);
    }
  }

  const fetchJobsWithBoatDetails = async () => {
    try {
      const response = await axios.get(`${BOAT_BUTLER_API}/api/company/jobs`, {
        headers: { Authorization: "bearer " + token }
      });
      if (response.status === 200) {
        const jobsRes: JobWithBoatDetails[] = response.data;
        if (jobsRes) {
          setJobsWithBoatDetails(jobsRes);
        };
      }

    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        logout();
      }
      const newAppState: AppState = {
        type: AppStateType.ERROR,
        message: "Fetch Error"
      }
      setAppState(newAppState);
    }
  }
  const fetchProposals = async () => {
    try {
      const response = await axios.get(`${BOAT_BUTLER_API}/api/company/proposals`, {
        headers: { Authorization: "bearer " + token }
      });
      if (response.status === 200) {
        const proposals: Proposal[] = response.data;
        if (proposals) {
          setProposals(proposals)
        };
      }

    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        logout();
      }
      const newAppState: AppState = {
        type: AppStateType.ERROR,
        message: "Fetch Error"
      }
      setAppState(newAppState);
    }
  }

  const selectJobAdId = (jobId: string) => {
    if (jobId) {
      setSelectedJobAdId(jobId);
    }
  }

  const resetAppState = () => {
    setAppState(undefined);
  }

  return (
    <UserContext.Provider value={{
      test: "testinggg",
      loggedIn,
      fetchAuthToken,
      logout,
      jobsWithBoatDetails,
      fetchJobsWithBoatDetails,
      selectedJobAdId,
      selectJobAdId,
      postProposal,
      proposals,
      fetchProposals,
      appState,
      resetAppState
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default withRouter(UserProvider);