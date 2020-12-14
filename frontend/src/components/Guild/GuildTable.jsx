import React from 'react';
import { Container } from 'semantic-ui-react';
import GuildPattern from './GuildPattern';

class GuildTable extends React.Component {
  state = {
    results: [],
  };

  arrayToTable = (arr) => {
    let key = 0;
    return arr.map((elem) => {
      return <GuildPattern guild={elem} key={key++} />;
    });
  };

  render() {
    return <Container>{this.arrayToTable(this.state.results)}</Container>;
  }
}

export default GuildTable;
