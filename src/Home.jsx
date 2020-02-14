import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  } 

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
        <div>
          {this.state.authenticated &&
            <div>
              <p>Welcome back, {this.state.userinfo.name}!</p>
              <p>
                You have successfully authenticated against your Okta org <br />
                Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
              </p>
            </div>
          }
          <center>
            {!this.state.authenticated &&
              <div>
                <br />
                <button id="login-button" onClick={this.login}>Login with Okta</button>
              </div>
            }
            {this.state.authenticated &&
              <div>
                <button id="login-button" onClick={this.logout}>Logout with Okta</button>
              </div>  
            }
          </center>  
        </div>
        }
      </div>
    );
  }
});
