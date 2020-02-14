import React, { Component } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from './config';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
    this.signIn = new OktaSignIn({
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: '/react.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to my company',
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });
  }
  componentDidMount() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
      },
      (err) => {
        throw err;
      },
    );
  }
  render() {
    return (
      <div>
        <div id="sign-in-widget" />
      </div>
    );
  }
}

