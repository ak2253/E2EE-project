import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/mainmenu">
            <MainMenu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
