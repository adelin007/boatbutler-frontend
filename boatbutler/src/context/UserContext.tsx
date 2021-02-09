import React, {
    createContext,
    useState,
    useEffect,
    SyntheticEvent
  } from "react";

  import axios from "axios";
  import { withRouter } from "react-router-dom";
  import {BOAT_BUTLER_API, JobWithBoatDetails} from "../utils/definitions";

  interface TokenBody {
    token: string;
  }

  type ContextProps = {
        test: string,
        loggedIn: boolean,
        logout: () => void;
        fetchAuthToken: (email: string, password: string) => Promise<void>;
        fetchJobsWithBoatDetails: () => Promise<void>;
        jobsWithBoatDetails: JobWithBoatDetails[] | undefined;
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

    const [jobsWithBoatDetails, setJobsWithBoatDetails ] = useState<JobWithBoatDetails[]>();

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
        console.log("GONNA LOGIN NOW BOYZ!");
    
        if (!email || !password) {
        //   setError({
        //     type: AppErrorType.AUTH,
        //     message: "Email or password missing!",
        //     dialogDuration: DEFAULT_ERROR_DIALOG_DURATION,
        //     redirectTo: null
            
        //   });
        } else {
          try {
            // setIsLoading(true);
    
            const response = await axios.post(`${BOAT_BUTLER_API}/api/login`, {
              email: email,
              password: password
            });
            if (response.status === 200) {
              const tokenBody: TokenBody = response.data;
              if(tokenBody){
                setToken(tokenBody.token);
              }
              
            }
            // setIsLoading(false);
          } catch (error) {
            // console.log("Login error: ", error.response);
            // if (error.response && error.response.status) {
            //   setError({
            //     type: AppErrorType.AUTH,
            //     message: "Unauthorized! Email or password is wrong!",
            //     dialogDuration: DEFAULT_ERROR_DIALOG_DURATION,
            //     redirectTo: null
            //   });
            // } else {
            //   setError({ type: AppErrorType.AUTH, message: error.message, dialogDuration: DEFAULT_ERROR_DIALOG_DURATION,redirectTo: null });
            // }
            // setIsLoading(false);
          }
        }
      };

      const fetchJobsWithBoatDetails = async() => {
          try{
          const response = await axios.get(`${BOAT_BUTLER_API}/api/company/jobs`, {
            headers: { Authorization: "bearer " + token }
          });
          if (response.status === 200) {
            const jobsRes: JobWithBoatDetails[] = response.data;
            if (jobsRes) {
                setJobsWithBoatDetails(jobsRes)
              };
          
            }

          }catch(error){
            if (error && error.response && error.response.status === 401) {
              logout();
            }
          console.log("ERROR fetch: ", error);
        
        }
      }


    return(
        <UserContext.Provider value={{
            test: "testinggg",
            loggedIn,
            fetchAuthToken,
            logout,
            jobsWithBoatDetails,
            fetchJobsWithBoatDetails
        }}>
            {props.children}
        </UserContext.Provider>
    )
  }

  export default withRouter(UserProvider);