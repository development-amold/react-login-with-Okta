import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './config';
import CustomLoginComponent from './Login';
import Profile from './Profile';
import Home from './Home';

function customAuthHandler({ history }) {
  history.push('/login');
}

function App() {
  return (
    <div className="App">
      <Router>
        <Security
          {...config.oidc}
          onAuthRequired={customAuthHandler}
        >
          <Route path="/" exact component={Home} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/login" component={CustomLoginComponent} />
          <SecureRoute path="/profile" component={Profile} />
        </Security>
      </Router>
    </div>
  );
}

export default App;
