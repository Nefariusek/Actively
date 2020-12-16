import React from 'react';
import { Container } from 'semantic-ui-react';
import InventoryBackpack from './InventoryBackpack';
import InventoryEquipped from './InventoryEquipped';

const InventoryContent = () => {
  return (
    <Container>
      <InventoryEquipped />
      <InventoryBackpack />
    </Container>
  );
};

export default InventoryContent;
