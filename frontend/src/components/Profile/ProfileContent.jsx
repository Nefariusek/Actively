import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ProfileBox from './ProfileBox';
import StatisticsBox from './StatisticsBox';
import CharacterInfo from '../CharacterInfo/CharacterInfo';

const ProfileContent = () => {
  return (
    <Grid columns={3} divided>
      <GridColumn>
        <CharacterInfo />
      </GridColumn>
      <GridColumn>
        <ProfileBox />
      </GridColumn>
      <GridColumn>
        <StatisticsBox></StatisticsBox>
      </GridColumn>
    </Grid>
  );
};

export default ProfileContent;
