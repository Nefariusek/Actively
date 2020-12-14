import React from 'react';
import { Segment } from 'semantic-ui-react';
import MainGuild from './MainGuild';
import GuildList from './GuildList';

const GuildContent = () => {
  return (
    <Segment>
      <MainGuild />
      <GuildList />
    </Segment>
  );
};

export default GuildContent;
