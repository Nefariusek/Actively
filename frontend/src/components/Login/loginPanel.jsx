import jwt from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import ErrorMessage from '../ErrorMessage';
import setHeaders from '../../utils/setHeaders';
const axios = require('axios');

class LoginPanel extends React.Component {
  state = {
    email: '',
    password: '',
  };

  static contextType = Store;

  onButtonSubmit = async (e) => {
    e.preventDefault();
    delete this.state['invalidData'];
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth',
        headers: setHeaders(),
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      });
      if (res.status === 200) {
        const token = res.headers['x-auth-token'];
        localStorage.setItem('token', token);
        localStorage.setItem('id', jwt(token)._id);
        this.context.changeStore('isLogged', true);
        this.context.changeStore('character_id', res.data.character_id);
      }
    } catch (err) {
      this.setState({ invalidData: true });
    }
  };

  loginValidate = (e) => {
    if (this.state.invalidData) {
      return <ErrorMessage message="Invalid email or password" />;
    } else {
      return null;
    }
  };

  render() {
    if (this.context.isLogged) return <Redirect to="/homepage" />;

    return (
      <Segment color={'green'} inverted>
        <Segment textAlign="left">
          <Form error onSubmit={this.onButtonSubmit}>
            <Grid>
              <Grid.Row centered>
                <Header textAlign="center">Login</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Form.Input
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
                  error={this.loginValidate()}
                />
              </Grid.Row>
              <Grid.Row textAlign="center" padded centered>
                <Button color="green" type="submit">
                  Sign In
                </Button>
              </Grid.Row>
              <Grid.Row textAlign="center" centered>
                <Button color="grey" type="submit">
                  Sign Up
                </Button>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

export default LoginPanel;
