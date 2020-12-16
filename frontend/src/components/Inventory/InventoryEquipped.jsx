import React from 'react';
import { Grid, Segment, Header, Label } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import Store from '../../Store';

class InventoryBackpack extends React.Component {
  state = { items: [] };

  static contextType = Store;

  getItems = async () => {
    await axios({
      url: `api/inventory/${this.context.inventory_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({ items: res.data.equipped });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Header>Equipped Items</Header>
        </Segment>
        <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label>Head</Label>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label>Body</Label>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label>Weapon</Label>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label>Boots</Label>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default InventoryBackpack;
