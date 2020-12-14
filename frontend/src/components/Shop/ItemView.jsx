import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import BuyItem from './BuyItems';

class ItemView extends React.Component {
  state = { item: this.props.item };

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  BuyItemFun = () => {
    console.log('Item');
    this.props.buyItem(this.state.item);
  };

  render() {
    let activeV = this.props.item.price <= this.props.gold ? true : false;
    let disabledV = this.props.item.price > this.props.gold ? true : false;
    return (
      <Item key={this.props.item._id} color="grey">
        <Item.Image src={this.props.item.picture} size="small" wrapped />
        <Item.Content>
          <Item.Header>{this.props.item.name}</Item.Header>
          <Item.Meta>{this.props.item.description}</Item.Meta>
          <Item.Description>
            Effect: {this.props.item.effect} <br />
            Value: {this.props.item.effect_value} <br />
            Slot: {this.props.item.slot} <br />
            Price: {this.props.item.price} <br /> <br /> <br />
          </Item.Description>
          <Item.Extra>
            <Label horizontal attached="bottom" size="tiny" color="grey">
              <BuyItem
                item={this.props.item}
                active={activeV}
                disabled={disabledV}
                value1={this.props.item.price}
                value2={this.props.gold}
                BuyItemFun={this.BuyItemFun}
              />
            </Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default ItemView;
