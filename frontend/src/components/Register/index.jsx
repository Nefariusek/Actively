import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Register from './register';

const RegisterContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <Switch>
          <Route exact path="/register" component={Register} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default RegisterContent;
