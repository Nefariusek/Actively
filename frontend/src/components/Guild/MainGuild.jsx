import axios from 'axios';
import React from 'react';

import { Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

class MainGuild extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
  };

  static contextType = Store;

  getGuilds = async () => {
    await axios({
      url: `api/social`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (response) => {
        console.log(response);
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

  render() {
    return (
      <Segment inverted>
        <Header>Main Guild</Header>
      </Segment>
    );
  }
}

export default MainGuild;
