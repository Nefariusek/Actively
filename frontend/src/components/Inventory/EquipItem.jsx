import React from 'react';
import { Button } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import Store from '../../Store';

class EquipItem extends React.Component {
  static contextType = Store;

  handleClick = async () => {
    await axios({
      url: `/api/inventory/${this.context.inventory_id}/${this.props.item.slot}`,
      method: 'put',
      data: {
        name: this.props.item.name,
        description: this.props.item.description,
        slot: this.props.item.slot,
        picture: this.props.item.picture,
        effect: this.props.item.effect,
        effect_value: this.props.item.effect_value,
        price: this.props.item.price,
      },
      headers: setHeaders(),
    })
      .then(() => {})
      .catch((error) => console.error(error));
    await this.useItem(this.props.item);
  };

  useItem = async (item, sign) => {
    console.log('Use item ,', item.name);
    const charID = this.context.character_id;
    const responseChar = await fetch(`/api/characters/${charID}`, setHeaders());
    const character = await responseChar.json();

    if (item.effect.includes('wisdom')) {
      await axios.put(`/api/characters/${charID}/wisdom`, {
        wisdom: `${character.wisdom + item.effect_value}`,
      });
    }

    if (item.effect.includes('dexterity')) {
      await axios.put(`/api/characters/${charID}/dexterity`, {
        dexterity: `${character.dexterity + item.effect_value}`,
      });
    }

    if (item.effect.includes('strength')) {
      await axios.put(`/api/characters/${charID}/strength`, {
        strength: `${character.strength + item.effect_value}`,
      });
    }

    if (item.effect.includes('health') || item.effect.includes('hp')) {
      await axios.put(`/api/characters/${charID}/max_health`, {
        max_health: `${character.max_health + item.effect_value}`,
      });
    }

    if (item.effect.includes('health') || item.effect.includes('hp')) {
      await axios.put(`/api/characters/${charID}/health`, {
        health: `${character.max_health + item.effect_value}`,
      });
    }
  };

  render() {
    return (
      <Button size="medium" color="yellow" animated="fade" onClick={this.handleClick}>
        Equip
      </Button>
    );
  }
}

export default EquipItem;
