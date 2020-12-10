import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoginPanel from './loginPanel';

const LoginContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <Switch>
          <Route exact path="/login" component={LoginPanel} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default LoginContent;
