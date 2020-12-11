import React from 'react';
import { Grid, Segment, GridColumn } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import NavButton from '../NavButton/NavButton';
import Store from '../../Store';

class HomepageContent extends React.Component {
  state = {};

  static contextType = Store;

  render() {
    if (!this.context.isLogged) return <Redirect to="/login" />;
    return (
      <Grid columns={3} divided>
        <Grid.Row>
          <GridColumn>
            <Segment>
              <CharacterInfo />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment>
              <NavButton icon="book" color="grey" description="Questbook" link="/questbook" />
            </Segment>
            <Segment>
              <NavButton icon="users" color="blue" description="Social" link="/social" />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment>
              <NavButton icon="boxes" color="brown" description="Inventory" link="/inventory" />
            </Segment>
            <Segment>
              <NavButton icon="chart bar" color="green" description="Profile" link="/profile" />
            </Segment>
          </GridColumn>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomepageContent;
