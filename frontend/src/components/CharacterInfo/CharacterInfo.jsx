import axios from 'axios';
import React from 'react';
import { Icon, Grid, Container, Progress, Label } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

class CharacterInfo extends React.Component {
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
    loaded: false,
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
        });
        this.context.changeStore('character_id', res.data._id);
        this.context.changeStore('inventory_id', res.data.inventory_id);
        this.context.changeStore('social_id', res.data.social_id);
        this.context.changeStore('statistics_id', res.data.statistics_id);
        this.context.changeStore('questbook_id', res.data.questbook_id);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  calculatePercent = (value, maxValue) => {
    let result = (value / maxValue) * 100;
    return result;
  };

  componentDidMount = async () => {
    this.setState({ loaded: true });
    await this.getCharacter();
    console.log(this.context);
  };

  render() {
    return (
      <Container>
        <Grid centered>
          <Grid.Row>
            <Label>
              {this.state.charClass} {this.state.name}
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Icon name="user" size="massive"></Icon>
          </Grid.Row>

          <br></br>
          <Grid.Row centered>
            <Label>Level: {this.state.level}</Label>
          </Grid.Row>
        </Grid>
        <br></br>
        <Grid.Row>
          <Progress
            color="green"
            percent={this.calculatePercent(this.state.health, this.state.max_health)}
            progress
            label="Health"
            precision="0"
          />
        </Grid.Row>
        <br></br>
        <Grid.Row>
          <Progress
            color="yellow"
            percent={this.calculatePercent(this.state.endurance, this.state.max_endurance)}
            progress
            label="Endurance"
            precision="0"
          />
        </Grid.Row>
        <br></br>
        <Grid.Row>
          <Progress
            color="blue"
            percent={this.calculatePercent(this.state.experience_points, this.state.experience_required)}
            progress
            label="Experience"
            precision="0"
          />
        </Grid.Row>
      </Container>
    );
  }
}

export default CharacterInfo;
