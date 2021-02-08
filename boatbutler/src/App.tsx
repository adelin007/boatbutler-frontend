import React, {useContext} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import {Login} from "./components/Login";
import UserProvider, { UserContext } from "./context/UserContext";
import Navbar from "./components/NavBar";
import UserPanel from "./components/UserPanel";


function App() {
  const { test } = useContext(UserContext);
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      <Router>
        <UserProvider>
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/user" component={UserPanel}/>
              <Route exact path="/login" component={Login} />
          </Switch>
        </UserProvider>
      </Router>
      {/* <Login /> */}
    </div>
  );
}

export default App;
