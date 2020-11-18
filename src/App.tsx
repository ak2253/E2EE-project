import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';

function App() {
  return (
    <Router>
      <div className="App">
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
