import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import ErrorMessage from '../ErrorMessage';

const axios = require('axios');

class Login extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailTaken: false,
  };

  static contextType = Store;

  postUser = async () => {
    try {
      if (this.state.password !== this.state.confirmPassword) {
        throw new Error('Both passwords must be the same');
      }

      const res = await axios({
        method: 'post',
        url: '/api/users',
        data: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        document.location.href = '/login';
      } else {
        this.setState({ invalidData: true });
      }
    } catch (error) {
      console.error('Error Registration:', error);
      this.setState({ invalidData: true });
    }
  };

  checkEmail = async () => {
    await axios({
      url: '/api/users',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      (response) => {
        response.data.forEach((data) => {
          if (data.email === this.state.email) {
            this.setState({ emailTaken: true });
          }
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  onButtonSubmit = async (e) => {
    e.preventDefault();
    this.setState({ emailTaken: false });
    await this.checkEmail();
    if (this.state.emailTaken === false) {
      this.postUser();
    }
  };

  usernameValidate = (e) => {
    if (this.state.username.length < 3 && this.state.invalidData) {
      return <ErrorMessage message="Username must be longer than three characters!" />;
    } else {
      return null;
    }
  };

  emailValidate = (e) => {
    if (this.state.emailTaken === true) {
      return <ErrorMessage message="A user with this email address already exists!" />;
    } else {
      return null;
    }
  };

  passwordValidate = (e) => {
    if (this.state.password !== this.state.confirmPassword && this.state.invalidData) {
      return <ErrorMessage message="Both passwords must be the same!" />;
    } else if ((this.state.password.length < 8 || this.state.confirmPassword.length < 8) && this.state.invalidData) {
      return <ErrorMessage message="Password must be longer than eight characters!" />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Segment color="green" inverted>
          <Segment textAlign="left">
            <Form success error onSubmit={this.onButtonSubmit}>
              <Grid>
                <Grid.Row centered>
                  <Header textAlign="center">Register</Header>
                </Grid.Row>
                <Grid.Row centered>
                  <Form.Input
                    error={this.usernameValidate()}
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                  />
                </Grid.Row>
                <Grid.Row centered>
                  <Form.Input
                    error={this.emailValidate()}
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Grid.Row>
                <Grid.Row centered>
                  <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </Grid.Row>
                <Grid.Row centered>
                  <Form.Input
                    error={this.passwordValidate()}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                  />
                </Grid.Row>
                <Grid.Row centered>
                  <Button color="green" type="submit">
                    Submit
                  </Button>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Segment>
      </BrowserRouter>
    );
  }
}

export default Login;
