import React from 'react';
import { Grid, Container, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class ProfileBox extends React.Component {
  state = {
    name: '',
    charClass: '',
    level: '',
    health: '',
    max_health: '',
    endurance: '',
    max_endurance: '',
    experience_points: '',
    experience_required: '',
    strength: '',
    dexterity: '',
    wisdom: '',
  };

  static contextType = Store;

  getCharacter = async () => {
    await axios({
      url: `api/characters/${this.context.character_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({
          name: res.data.name,
          charClass: res.data.charClass,
          level: res.data.level,
          health: res.data.health,
          max_health: res.data.max_health,
          endurance: res.data.endurance,
          max_endurance: res.data.max_endurance,
          experience_points: res.data.experience_points,
          experience_required: res.data.experience_required,
          strength: res.data.strength,
          dexterity: res.data.dexterity,
          wisdom: res.data.wisdom,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount = async () => {
    await this.getCharacter();
  };

  render() {
    if (!this.context.isLogged) return <Redirect to="/login" />;
    return (
      <Container>
        <Grid>
          <br></br>
          <List>
            <List.Item>
              <List.Header>Name</List.Header>
              {this.state.name}
            </List.Item>
            <List.Item>
              <List.Header>Class</List.Header>
              {this.state.charClass}
            </List.Item>
            <List.Item>
              <List.Header>Level</List.Header>
              {this.state.level}
            </List.Item>
            <List.Item>
              <List.Header>Health</List.Header>
              {this.state.health}/{this.state.max_health}
            </List.Item>
            <List.Item>
              <List.Header>Endurance</List.Header>
              {this.state.endurance}/{this.state.max_endurance}
            </List.Item>
            <List.Item>
              <List.Header>Experience</List.Header>
              {this.state.experience_points}/{this.state.experience_required}
            </List.Item>
            <List.Item>
              <List.Header>Strength</List.Header>
              {this.state.strength}
            </List.Item>
            <List.Item>
              <List.Header>Dexterity</List.Header>
              {this.state.dexterity}
            </List.Item>
            <List.Item>
              <List.Header>Wisdom</List.Header>
              {this.state.wisdom}
            </List.Item>
          </List>
        </Grid>
      </Container>
    );
  }
}

export default ProfileBox;
