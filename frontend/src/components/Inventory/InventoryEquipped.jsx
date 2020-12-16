import React from 'react';
import { Grid, Segment, Header, Label, Item, Text } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import Store from '../../Store';

class InventoryBackpack extends React.Component {
  state = {
    headItem: '',
    weaponItem: '',
    bodyItem: '',
    legsItem: '',
  };

  static contextType = Store;

  getItems = async () => {
    await axios({
      url: `api/inventory/${this.context.inventory_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({
          headItem: res.data.headItem,
          weaponItem: res.data.weaponItem,
          bodyItem: res.data.bodyItem,
          legsItem: res.data.legsItem,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  componentDidMount() {
    this.getItems();
  }

  componentDidUpdate() {
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
                  {this.state.headItem ? (
                    <Segment inverted color="grey">
                      <Item color="grey">
                        <Item.Image src={this.state.headItem.picture} size="small" wrapped />
                        <Item.Content>
                          <Item.Header>{this.state.headItem.name}</Item.Header>
                          <Item.Meta>{this.state.headItem.description}</Item.Meta>
                          <Item.Description>
                            Effect: {this.state.headItem.effect} <br />
                            Value: {this.state.headItem.effect_value} <br />
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Segment>
                  ) : (
                    <p>No item equipped</p>
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label>Body</Label>
                  {this.state.bodyItem ? (
                    <Segment inverted color="grey">
                      <Item color="grey">
                        <Item.Image src={this.state.bodyItem.picture} size="small" wrapped />
                        <Item.Content>
                          <Item.Header>{this.state.bodyItem.name}</Item.Header>
                          <Item.Meta>{this.state.bodyItem.description}</Item.Meta>
                          <Item.Description>
                            Effect: {this.state.bodyItem.effect} <br />
                            Value: {this.state.bodyItem.effect_value} <br />
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Segment>
                  ) : (
                    <p>No item equipped</p>
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Label>Weapon</Label>
                  {this.state.weaponItem ? (
                    <Segment inverted color="grey">
                      <Item color="grey">
                        <Item.Image src={this.state.weaponItem.picture} size="small" wrapped />
                        <Item.Content>
                          <Item.Header>{this.state.weaponItem.name}</Item.Header>
                          <Item.Meta>{this.state.weaponItem.description}</Item.Meta>
                          <Item.Description>
                            Effect: {this.state.weaponItem.effect} <br />
                            Value: {this.state.weaponItem.effect_value} <br />
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Segment>
                  ) : (
                    <p>No item equipped</p>
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label>Boots</Label>
                  {this.state.legsItem ? (
                    <Segment inverted color="grey">
                      <Item color="grey">
                        <Item.Image src={this.state.legsItem.picture} size="small" wrapped />
                        <Item.Content>
                          <Item.Header>{this.state.legsItem.name}</Item.Header>
                          <Item.Meta>{this.state.legsItem.description}</Item.Meta>
                          <Item.Description>
                            Effect: {this.state.legsItem.effect} <br />
                            Value: {this.state.legsItem.effect_value} <br />
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Segment>
                  ) : (
                    <p>No item equipped</p>
                  )}
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
