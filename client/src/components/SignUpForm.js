import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import fetch from '../fetch';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignUp(e) {
    e.preventDefault();

    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then((res) => {
        if (res.token) {
          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errorMessage: '',
          }, () => {
            this.props.updateState({
              name: res.name,
              signedIn: true,
              token: res.token,
            }, () => this.setState({ redirect: true }));
          });
        } else {
          this.setState({
            errorMessage: res.message,
          });
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/setup" />;
    }
    return (
      <div>
        <h3>Sign up:</h3>
        {this.state.errorMessage && (
          <p>{this.state.errorMessage}</p>
        )}
        <form onSubmit={this.handleSignUp} autoComplete="off" >
          <input
            name="firstName"
            type="text"
            placeholder="first name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="email"
            type="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          /> <br />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          /> <br />
          <button type="submit" >submit</button>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  updateState: PropTypes.func.isRequired,
};
