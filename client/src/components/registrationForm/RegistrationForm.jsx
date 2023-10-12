import React, { Component } from 'react';
import axios from 'axios';
import './registrationForm.scss';
class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        'http://localhost:5000/api/user-create',
        {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
        {
          'Access-Control-Allow-Origin': '*',
        },
      )
      .then(() => {
        window.location.replace('http:localhost:3000');
      });
  };

  render() {
    return (
      <div className="reg-container">
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="reg-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Имя пользователя"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="reg-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Электронная почта"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="reg-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="buttons">
            <button type="submit">Sign Up</button>
            <button className="listofusers">All users</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
