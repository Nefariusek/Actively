import React from 'react';
import { Container } from 'semantic-ui-react';
import QuestbookPattern from './QuestbookPattern';

class QuestbookTable extends React.Component {
  state = {
    results: [],
  };

  arrayToTable = (arr) => {
    let key = 0;
    return arr.map((elem) => {
      return <QuestbookPattern questbook={elem} key={key++} />;
    });
  };

  render() {
    return <Container>{this.arrayToTable(this.state.results)}</Container>;
  }
}

export default QuestbookTable;
