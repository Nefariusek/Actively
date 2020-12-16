import React from 'react';
import { Segment, Grid, List } from 'semantic-ui-react';
import Store from '../../Store';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

class GuildPattern extends React.Component {
  state = {
    guild_leader: '',
  };
  static contextType = Store;

  portalRef = React.createRef();

  getLeaderName = async (leader) => {
    await axios({
      url: `api/characters/${leader}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({
          guild_leader: response.data.name,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidMount = async () => {};

  render() {
    return (
      <Segment inverted>
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <List.Item>
                <List.Header>Guild Name: {this.props.guild.name}</List.Header>
              </List.Item>
            </Grid.Column>
            <Grid.Column>
              <List.Item>
                <List.Header>Members: {this.props.guild.members.length}</List.Header>
              </List.Item>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
    );
  }
}

export default GuildPattern;
