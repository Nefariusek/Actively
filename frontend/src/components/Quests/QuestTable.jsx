import React from 'react';
import { Container } from 'semantic-ui-react';
import QuestPattern from './QuestPattern';

class QuestTable extends React.Component {
  state = {
    results: [],
  };

  arrayToTable = (arr) => {
    let key = 0;
    return arr.map((elem) => {
      return <QuestPattern quest={elem} key={key++} />;
    });
  };

  render() {
    return <Container>{this.arrayToTable(this.state.results)}</Container>;
  }
}

export default QuestTable;
