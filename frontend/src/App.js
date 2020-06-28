import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import Schedule from "./pages/schedule";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AdminSchedule from "./pages/admin-schedule";
import DateFnsUtils from "@date-io/date-fns";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/admin-schedule">
            <AdminSchedule />
          </Route>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
