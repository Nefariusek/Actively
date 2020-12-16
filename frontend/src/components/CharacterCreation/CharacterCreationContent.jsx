import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Radio, Segment } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import TopPortal from '../Utils/TopPortal';

const classChosen = {
  '': {
    avatar: '',
    text: 'Choose a class for more information.',
    stats: '',
  },
  Warrior: {
    avatar: 'https://cdna.artstation.com/p/assets/images/images/014/222/254/large/cesar-art-nurgl.jpg?1543048465',
    text: 'Mighty swordmaster',
    stats: '+5 additional maximum health and strength per level',
  },
  Hunter: {
    avatar: 'https://i.pinimg.com/originals/a2/05/34/a20534bec75f72bd837e77a52ca5c84d.jpg',
    text: 'Sneaky sniper',
    stats: '+10 additional dexterity per level',
  },
  Mage: {
    avatar:
      'https://previews.123rf.com/images/chudtsankov/chudtsankov1303/chudtsankov130300165/18573211-happy-wizard-with-open-arms.jpg',
    text: 'Kills in 5 seconds dies in 2...',
    stats: '+10 additional wisdom per level',
  },
};

class CharacterCreation extends React.Component {
  state = {
    name: '',
    charClass: '',
    inventory_id: '',
    questbook_id: '',
    statistics_id: '',
    social_id: '',
    experience_required: 100,
    endurance: 100,
    health: '',
    strength: '',
    dexterity: 5,
    wisdom: '',
    nameTaken: false,
    charCreated: null,
    _id: null,
    triedToSubmit: false,
    open: false,
  };

  static contextType = Store;
  portalRef = React.createRef();

  postQuestbook = async () => {
    await axios({
      url: 'api/questbook',
      method: 'post',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ questbook_id: response.data._id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  postInventory = async () => {
    await axios({
      url: 'api/inventory',
      method: 'post',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ inventory_id: response.data._id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  postStatistics = async () => {
    await axios({
      url: 'api/statistics',
      method: 'post',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ statistics_id: response.data._id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  postSocial = async () => {
    await axios({
      url: 'api/social',
      method: 'post',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ social_id: response.data._id });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  putCharId = async () => {
    await axios({
      url: `api/users/${this.context.me._id}/character_id`,
      method: 'put',
      data: { character_id: this.state._id },
      headers: setHeaders(),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  setStatistics = async () => {
    if (this.state.charClass === 'Warrior') {
      this.setState({
        health: 35,
        strength: 11,
        dexterity: 6,
        wisdom: 1,
      });
    } else if (this.state.charClass === 'Hunter') {
      this.setState({
        health: 31,
        strength: 6,
        dexterity: 11,
        wisdom: 1,
      });
    } else if (this.state.charClass === 'Mage') {
      this.setState({
        health: 31,
        strength: 6,
        dexterity: 1,
        wisdom: 11,
      });
    }
  };

  postCharacter = async () => {
    await this.setStatistics();
    await this.postQuestbook();
    await this.postInventory();
    await this.postStatistics();
    await this.postSocial();
    console.log(this.state);
    await axios({
      url: 'api/characters',
      method: 'post',
      data: {
        name: this.state.name,
        charClass: this.state.charClass,
        inventory_id: this.state.inventory_id,
        questbook_id: this.state.questbook_id,
        statistics_id: this.state.statistics_id,
        social_id: this.state.social_id,
        experience_required: this.state.experience_required,
        max_health: this.state.health,
        health: this.state.health,
        strength: this.state.strength,
        dexterity: this.state.dexterity,
        wisdom: this.state.wisdom,
        endurance: this.state.endurance,
        max_endurance: this.state.endurance,
      },
      headers: setHeaders(),
    }).then(
      (response) => {
        if (response.status === 200) {
          this.setState({ charCreated: true, _id: response.data._id });
        } else {
          this.setState({ charCreated: false });
        }
      },
      (error) => {
        console.log(error);
      },
    );
    if (this.state.charCreated) {
      this.portalRef.current.handleOpen();
      await new Promise((res) => setTimeout(res, 3500));
      this.setState({ open: false });
    }
  };

  checkName = async () => {
    await axios({
      url: 'api/characters',
      method: 'get',
      headers: setHeaders(),
    }).then(
      (response) => {
        response.data.forEach((data) => {
          if (data.name === this.state.name) {
            this.setState({ nameTaken: true });
          }
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  handleButtonClick = async (event) => {
    this.setState({ triedToSubmit: true });
    this.setState({ nameTaken: false });
    event.preventDefault();
    await this.checkName();
    if (this.state.nameTaken === false && this.state.name.length >= 5) {
      await this.postCharacter();
      await this.putCharId();
      this.context.changeStore('hasCharacter', true);
      this.context.changeStore('character_id', this.state._id);
      this.context.changeStore('statistics_id', this.state.statistics_id);
      this.context.changeStore('inventory_id', this.state.inventory_id);
      this.context.changeStore('social_id', this.state.social_id);
      this.context.changeStore('questbook_id', this.state.questbook_id);
    }
  };

  handleInputChange = (e, { name, value }) => this.setState({ name: value, triedToSubmit: false });
  handleRadioChange = (e, { charClass, value }) => this.setState({ charClass: value });

  nameValidate = (e) => {
    if (this.state.name.length < 5 && this.state.triedToSubmit) {
      return { content: <ErrorMessage message="Name must be at least 5 characters long." /> };
    } else if (this.state.nameTaken && this.state.triedToSubmit && !this.state.charCreated) {
      return { content: <ErrorMessage message="This name is already taken." /> };
    } else {
      return false;
    }
  };

  render() {
    if (this.context.hasCharacter) return <Redirect to="/homepage" />;

    const { name, charClass } = this.state;
    const { text, avatar, stats } = classChosen[charClass];
    return (
      <div>
        {this.state.charCreated === true ? <SuccessMessage message="Character created" /> : null}
        <Segment inverted>
          <Form onSubmit={this.handleButtonClick} inverted>
            <Grid>
              <Grid.Row centered>
                <Header inverted>Character name</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Form.Group inline>
                  <Form.Input
                    error={this.nameValidate()}
                    required
                    placeholder="Character Name"
                    name="name"
                    value={this.name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Grid.Row>
              <Grid.Row centered>
                <Header inverted>Character class</Header>
              </Grid.Row>
              <Grid.Row centered>
                <Form.Group inline>
                  <Form.Field>
                    <Radio
                      label="Warrior"
                      name="charClassRadio"
                      value="Warrior"
                      checked={charClass === 'Warrior'}
                      onChange={this.handleRadioChange}
                      default
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Hunter"
                      name="charClassRadio"
                      value="Hunter"
                      checked={charClass === 'Hunter'}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Mage"
                      name="charClassRadio"
                      value="Mage"
                      checked={charClass === 'Mage'}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Grid.Row>
            </Grid>
            <Grid textAlign="center" padded>
              <Button type="submit" color="green">
                Create
              </Button>
            </Grid>
          </Form>
        </Segment>

        <Segment.Group horizontal>
          <Segment style={{ width: '45%', height: '60vh' }} floated="left" color="black" inverted>
            <Image style={{ width: '100%', height: '100%' }} src={avatar} />
          </Segment>
          <Segment style={{ width: '55%' }} floated="right" color="black" inverted>
            <Header as="h1">
              {charClass} {name}
            </Header>
            <Header>{text}</Header>
            <Header>{stats}</Header>
          </Segment>
        </Segment.Group>
        <TopPortal ref={this.portalRef} header={'Success!'} description={`Character created!`} />
      </div>
    );
  }
}

export default CharacterCreation;
