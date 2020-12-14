import React from 'react';
import { Button } from 'semantic-ui-react';

class BuyItem extends React.Component {
  render() {
    return (
      <Button
        size="small"
        color="yellow"
        animated="fade"
        active={this.props.active}
        disabled={this.props.disabled}
        onClick={this.props.BuyItemFun}
      >
        <Button.Content visible>{this.props.value1 <= this.props.value2 ? 'Buy' : 'Not enough money'}</Button.Content>
        <Button.Content hidden>{this.props.value1}</Button.Content>
      </Button>
    );
  }
}

export default BuyItem;
