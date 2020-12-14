import React from 'react';
import { Segment, Step, Icon, Popup, Header, Item, Button, Label } from 'semantic-ui-react';
import Store from '../../Store';
import TopPortal from '../Utils/TopPortal';
import axios from 'axios';

class GuildPattern extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = Store;

  portalRef = React.createRef();

  componentDidMount = async () => {};

  render() {
    return <Segment inverted>guildia</Segment>;
  }
}

export default GuildPattern;
