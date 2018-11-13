import React, { Component } from 'react';

export default class SignUpModal extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <input
            id="username"
            type="text"
            value="User Name"
          />

          <input
            id="password"
            type="text"
            value="User Name"
          />

          <input
            id="password-confirmation"
            type="text"
            value="User Name"
          />
        </form>
      </React.Fragment>
    );
  }
}
