import axios from 'axios';
import React from 'react';

import { Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import QuestTable from './QuestTable';

class QuestList extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
  };

  questTableRef = React.createRef();
  static contextType = Store;

  getQuests = async () => {
    await axios({
      url: `api/quests`,
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

  componentDidMount = async () => {
    await this.getQuests();
  };

  componentDidUpdate() {
    this.questTableRef.current.setState({ results: this.state.results });
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Header>Quests</Header>
        </Segment>
        <Segment>
          <QuestTable ref={this.questTableRef} />
        </Segment>
      </div>
    );
  }
}

export default QuestList;
