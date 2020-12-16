import React from 'react';
import axios from 'axios';
import { Grid, Segment, Label } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ItemView from './ItemView';

import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

class ShopContent extends React.Component {
  state = {
    items: [],
    gold: 0,
  };

  static contextType = Store;

  getInventory = async () => {
    await axios({
      url: `api/inventory/${this.context.inventory_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({ gold: res.data.gold });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  getItems = async () => {
    await axios({
      url: `api/item`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({ items: res.data });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  fetchBuyItem = async (item) => {
    await axios({
      url: `/api/inventory/${this.context.inventory_id}/backpack`,
      method: 'put',
      data: {
        name: item.name,
        description: item.description,
        slot: item.slot,
        picture: item.picture,
        effect: item.effect,
        effect_value: item.effect_value,
        price: item.price,
      },
      headers: setHeaders(),
    })
      .then(() => {})
      .catch((error) => console.error(error));
    let afterPay = this.state.gold - item.price;
    this.setState({ gold: afterPay });
    await this.fetchPayGold(afterPay);
  };

  fetchPayGold = async (gold) => {
    await axios({
      url: `/api/inventory/${this.context.inventory_id}/gold`,
      method: 'put',
      data: {
        inventory: {
          gold: gold,
        },
      },
      headers: setHeaders(),
    }).catch((error) => console.error(error));
  };

  componentDidMount = async () => {
    await this.getItems();
    await this.getInventory();
  };

  render() {
    if (!this.context.isLogged) return <Redirect to="/login" />;
    return (
      <Segment color={'green'} inverted>
        <Segment>
          <Grid doubling container centered columns="equal" padded>
            <Grid.Row textAlign="center" verticalAlign="top">
              <Grid.Column>
                <Label>Your gold: {this.state.gold}</Label>
              </Grid.Column>
            </Grid.Row>
            {this.state.items.map((item) => (
              <Grid.Column mobile={16} tablet={8} computer={4} stretched>
                <Segment inverted color="grey">
                  <ItemView item={item} gold={this.state.gold} buyItem={this.fetchBuyItem} buttonActive={true} />
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
      </Segment>
    );
  }
}

export default ShopContent;
