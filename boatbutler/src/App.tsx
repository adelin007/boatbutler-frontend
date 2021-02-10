import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import {Login} from "./components/Login";
import UserProvider from "./context/UserContext";
import UserPanel from "./components/UserPanel";
import AppStateSnackbar from "./components/AppStateSnackbar";

function App() {
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      <Router>
        <UserProvider>
        <AppStateSnackbar />
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/user" component={UserPanel}/>
              <Route exact path="/login" component={Login} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
