import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import Store from '../../Store';

const AppBar = () => {
  const { isLogged, changeStore, me, hasCharacter } = useContext(Store);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    changeStore('isLogged', false);
    changeStore('me', null);
    changeStore('hasCharacter', null);
    window.location.reload();
  };
  return (
    <Menu inverted color="black">
      <Menu.Item as={Link} to="/">
        <p style={{ color: 'white', fontWeight: 'bold', fontSize: 'large' }}>Actively</p>
      </Menu.Item>
      <br></br>

      {!isLogged && (
        <>
          <Menu.Item color="green" as={NavLink} name="Login" to="/login" activeClassName="active" />
          <br></br>
          <Menu.Item color="green" as={NavLink} name="Register" to="/register" activeClassName="active" />
          <br></br>
        </>
      )}
      {isLogged && !hasCharacter && (
        <>
          <Menu.Menu>
            <Menu.Item
              color="green"
              as={NavLink}
              name="Create Character"
              to="/characterCreation"
              activeClassName="active"
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item color="green" as={NavLink} name={me ? me.name : 'user'} to="/profile" activeClassName="active" />
            <Menu.Item color="green" as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
        </>
      )}
      {isLogged && hasCharacter && (
        <>
          <Menu.Menu>
            <Menu.Item color="green" as={NavLink} name="Questbook" to="/questbook" activeClassName="active" />
            <br></br>
            <Menu.Item color="green" as={NavLink} name="Quests" to="/quests" activeClassName="active" />
            <br></br>
            <Menu.Item color="green" as={NavLink} name="Shop" to="/shop" activeClassName="active" />
            <br></br>
            <Menu.Item color="green" as={NavLink} name="Inventory" to="/inventory" activeClassName="active" />
            <br></br>
            <Menu.Item color="green" as={NavLink} name="Social" to="/social" activeClassName="active" />
            <br></br>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item color="green" as={NavLink} name="Profile" to="/profile" activeClassName="active" />
            <Menu.Item color="green" as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default AppBar;
