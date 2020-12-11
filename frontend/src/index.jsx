import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Store, { StoreProvider } from './Store';
import setHeaders from './utils/setHeaders';
import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Homepage from './views/Homepage';
import Login from './views/Login';
import Register from './views/Register';

// import Quests from './views/Quests';
import CharacterCreation from './views/CharacterCreation';
//import Statistics from './views/Statistics';
// import Questbook from './views/Questbook';
// import Shop from './views/Shop';
//import Inventory from './views/Inventory';
//import Guild from './views/Guild';

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

const App = () => {
  const { isLogged, changeStore } = useContext(Store);

  useEffect(() => {
    if (!isLogged) return;
    (async () => {
      try {
        const response = await fetch('/api/users/me', setHeaders());
        if (response.status === 400) {
          localStorage.removeItem('token');
          changeStore('isLogged', false);
          changeStore('me', null);
          changeStore('hasCharacter', null);
          return;
        }
        const data = await response.json();
        changeStore('isLogged', true);
        changeStore('me', data);
        if (data.character_id) {
          changeStore('hasCharacter', true);
        } else {
          changeStore('hasCharacter', false);
        }
      } catch (ex) {
        console.error('Server not responding');
        console.error('Error', ex);
      }
    })();
  }, [changeStore, isLogged]);

  return (
    <BrowserRouter>
      <Container>
        <AppBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PrivateRoute path="/homepage" component={Homepage} />
          <PrivateRoute path="/characterCreation" component={CharacterCreation} />
          <Route render={() => <Redirect to="/homepage" />} />

          {/* <PrivateRoute exact path="/quests" component={Quests} /> */}
          {/* <PrivateRoute exact path="/questbook" component={Questbook} /> */}
          {/* <PrivateRoute exact path="/questbook/addCustomTask" component={Quests} /> */}
          {/* <PrivateRoute exact path="/shop" component={Shop} /> */}
          {/* <PrivateRoute exact path="/inventory" component={Inventory} /> */}
          {/* <PrivateRoute exact path="/guild" component={Guild} /> */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.querySelector('#root'),
);
