import React from 'react';
import { Item, Grid, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import Store from '../../Store';

class ItemView extends React.Component {
  state = { items: [] };

  static contextType = Store;

  getItems = async () => {
    await axios({
      url: `api/inventory/{this.context.inventory_id}`,
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

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Grid>
        {this.state.items.map((item) => (
          <Grid.Column mobile={16} tablet={8} computer={4} stretched>
            <Segment inverted color="grey">
              <Item key={item._id} color="grey">
                <Item.Image src={item.picture} size="small" wrapped />
                <Item.Content>
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Meta>{item.description}</Item.Meta>
                  <Item.Description>
                    Effect: {item.effect} <br />
                    Value: {item.effect_value} <br />
                    Slot: {item.slot} <br />
                    Price: {item.price} <br /> <br /> <br />
                  </Item.Description>
                </Item.Content>
              </Item>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default ItemView;
