import React from 'react';
import { Container, Icon, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class NavButton extends React.Component {
  state = {};

  render() {
    return (
      <Container textAlign="center" as={NavLink} to={this.props.link}>
        <Icon name={this.props.icon} size="massive" color={this.props.color}></Icon>
        <Header>{this.props.description}</Header>
      </Container>
    );
  }
}

export default NavButton;
