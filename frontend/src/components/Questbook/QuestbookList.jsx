import axios from 'axios';
import React from 'react';

import { Header, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import QuestbookTable from './QuestbookTable';

class QuestbookList extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
  };

  questbookTableRef = React.createRef();
  static contextType = Store;

  getQuestbook = async () => {
    await axios({
      url: `api/questbook/${this.context.questbook_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({ results: res.data });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount() {
    this.getQuestbook();
  }

  componentDidUpdate() {
    this.questbookTableRef.current.setState({ results: this.state.results });
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Header>Quests</Header>
        </Segment>
        <Segment>
          <QuestbookTable ref={this.questbookTableRef} />
        </Segment>
      </div>
    );
  }
}

export default QuestbookList;
