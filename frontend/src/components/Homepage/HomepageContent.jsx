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
              <NavButton icon="users" color="green" description="btn1" link="/" />
            </Segment>
            <Segment>
              <NavButton icon="users" color="grey" description="btn2" link="/" />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment>
              <NavButton icon="users" color="blue" description="btn3" link="/" />
            </Segment>
            <Segment>
              <NavButton icon="users" color="brown" description="btn4" link="/" />
            </Segment>
          </GridColumn>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomepageContent;
