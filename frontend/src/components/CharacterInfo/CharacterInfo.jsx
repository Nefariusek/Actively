import axios from 'axios';
import React from 'react';
import { Icon, Grid, Container, Progress, Label } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

class WorkerInfo extends React.Component {
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
  };

  static contextType = Store;

  getCharacter = async () => {
    await axios({
      url: `api/characters/${this.context.me.character_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        console.log(res);
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
    console.log(this.context.me);
    await this.getCharacter();
    this.setState({});
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
          />
        </Grid.Row>
        <br></br>
        <Grid.Row>
          <Progress
            color="yellow"
            percent={this.calculatePercent(this.state.endurance, this.state.max_endurance)}
            progress
            label="Endurance"
          />
        </Grid.Row>
        <br></br>
        <Grid.Row>
          <Progress
            color="blue"
            percent={this.calculatePercent(this.state.experience_points, this.state.experience_required)}
            progress
            label="Experience"
          />
        </Grid.Row>
      </Container>
    );
  }
}

export default WorkerInfo;
