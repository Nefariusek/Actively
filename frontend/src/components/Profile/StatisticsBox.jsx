import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class StatisticsBox extends React.Component {
  state = {
    playing_since: '',
    quests_completed: '',
    streak: '',
  };

  static contextType = Store;

  getStatistics = async () => {
    await axios({
      url: `api/statistics/${this.context.statistics_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({
          playing_since: res.data.playing_since,
          quests_completed: res.data.quests_completed,
          streak: res.data.streak,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount = async () => {
    await this.getStatistics();
  };

  render() {
    if (!this.context.isLogged) return <Redirect to="/login" />;
    return (
      <Grid>
        <br></br>
        <List>
          <List.Item>
            <List.Header>Playing Since</List.Header>
            {this.state.playing_since.split('T')[0]}
          </List.Item>
          <List.Item>
            <List.Header>Quests Completed</List.Header>
            {this.state.quests_completed}
          </List.Item>
          <List.Item>
            <List.Header>Streak</List.Header>
            {this.state.streak}
          </List.Item>
        </List>
      </Grid>
    );
  }
}

export default StatisticsBox;
