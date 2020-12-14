import axios from 'axios';
import React from 'react';

import { Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import GuildTable from './GuildTable';

class GuildList extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
  };

  guildTableRef = React.createRef();
  static contextType = Store;

  getGuilds = async () => {
    await axios({
      url: `api/guilds`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ results: response.data });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  componentDidMount() {
    this.getGuilds();
  }

  componentDidUpdate() {
    this.guildTableRef.current.setState({ results: this.state.results });
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Header>Guilds</Header>
        </Segment>
        <Segment>
          <GuildTable ref={this.guildTableRef} />
        </Segment>
      </div>
    );
  }
}

export default GuildList;
