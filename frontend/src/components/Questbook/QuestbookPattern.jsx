import React from 'react';
import { Segment, Step, Icon, Popup, Header, Item, Button, Label } from 'semantic-ui-react';
import Store from '../../Store';
import TopPortal from '../Utils/TopPortal';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class QuestPattern extends React.Component {
  constructor(props) {
    super(props);

    this.portalRef = React.createRef();
    this.portalFailRef = React.createRef();
    this.state = { open: false, fail: false };
  }

  static contextType = Store;

  putData = async (status) => {
    await axios({
      url: `/api/questbook/${this.context.questbook_id}/quest/${this.props.questbook._id}`,
      method: 'put',
      headers: setHeaders(),
      data: { status: status },
    }).then(() => {
      this.setState({ status: status });
    });
  };

  putGold = async (gold) => {
    await axios({
      url: `/api/inventory/${this.context.inventory_id}/gold`,
      method: 'put',
      headers: setHeaders(),
      data: { inventory: { gold: gold } },
    }).then((response) => {
      // console.log(response);
    });
  };

  putExp = async (exp_points) => {
    await axios({
      url: `/api/characters/${this.context.character_id}/experience_points`,
      method: 'put',
      headers: setHeaders(),
      data: { experience_points: exp_points },
    }).then((response) => {
      console.log(response);
    });
  };

  putEndurance = async (endurance) => {
    await axios({
      url: `/api/characters/${this.context.character_id}/endurance`,
      method: 'put',
      headers: setHeaders(),
      data: { endurance: endurance },
    }).then((response) => {
      // console.log(response);
    });
  };

  putQuestCompleted = async () => {
    await axios({
      url: `/api/statistics/${this.context.statistics_id}/quests_completed`,
      method: 'put',
      headers: setHeaders(),
      data: {},
    }).then((response) => {
      console.log(response);
    });
  };

  putGold = async (gold) => {
    await axios({
      url: `/api/inventory/${this.context.inventory_id}/gold`,
      method: 'put',
      headers: setHeaders(),
      data: { inventory: { gold: gold } },
    }).then((response) => {
      // console.log(response);
    });
  };

  putHealth = async (health) => {
    await axios({
      url: `/api/characters/${this.context.character_id}/health`,
      method: 'put',
      headers: setHeaders(),
      data: { health: health },
    }).then((response) => {
      // console.log(response);
    });
  };

  questCompleted = async () => {
    const responseInv = await fetch(`/api/inventory/${this.context.inventory_id}`, setHeaders());
    const inventory = await responseInv.json();
    const responseChar = await fetch(`/api/characters/${this.context.character_id}`, setHeaders());
    const character = await responseChar.json();
    const gold = inventory.gold + this.props.questbook.gold_reward;
    const exp_points = character.experience_points + this.props.questbook.experience_reward;
    const endurance = character.endurance - 20;
    await this.putGold(gold);
    await this.putExp(exp_points);
    await this.putEndurance(endurance);
    await this.putQuestCompleted();
  };

  onFinishButtonSubmit = () => {
    this.questCompleted();
    this.putData('completed');
  };

  onButtonSubmit = () => {
    this.putData('in_progress');
  };

  portalRef = React.createRef();

  pickColor() {
    if (this.props.questbook.status === '') return { color: 'blue' };
    if (this.props.questbook.status === 'in_progress') return { color: 'yellow' };
  }

  pickContent() {
    if (this.props.questbook.status === '') return 'Start quest';
    if (this.props.questbook.status === 'in_progress') return 'Quest in progress!';
  }

  pickIcon() {
    if (this.props.questbook.status === '') return { name: 'chevron right' };
    if (this.props.questbook.status === 'in_progress') return { name: 'clock' };
  }

  componentDidMount = async () => {};

  render() {
    return (
      <Segment inverted>
        <Item>
          <Item.Image style={{ display: 'inline-block' }}></Item.Image>
          <Item.Header
            style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }}
            as={'h1'}
          >
            {this.props.questbook.name}
          </Item.Header>

          <Popup content="Type" trigger={<Label color="orange">{this.props.questbook.type}</Label>} />

          <Item.Description>
            <Segment.Group>
              <Segment inverted textAlign="center" color="green" style={{ padding: '2px 0px 0px 6px' }}>
                <Header as="h5">Description</Header>
              </Segment>
              <Segment>
                {this.props.questbook.description}
                <br />
              </Segment>
            </Segment.Group>
          </Item.Description>

          <Step.Group widths={4} size="tiny">
            <Step style={{ padding: '2px' }}>
              <Icon name="dot circle" color="yellow" />
              <Step.Content>
                <Step.Title>Gold</Step.Title>
                <Step.Description>{this.props.questbook.gold_reward}</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="star" color="violet" />
              <Step.Content>
                <Step.Title>Experience</Step.Title>
                <Step.Description>{this.props.questbook.experience_reward}</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="clock" color="teal" />
              <Step.Content>
                <Step.Title>Duration</Step.Title>
                <Step.Description>{this.props.questbook.duration} hours</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="warning circle" color="red" />
              <Step.Content>
                <Step.Title>Penalty</Step.Title>
                <Step.Description>{this.props.questbook.penalty} hp</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>

          {this.props.questbook.status === 'completed' ? null : (
            <div>
              <div>
                {this.props.questbook.status === '' ? (
                  <Button fluid icon labelPosition="right" {...this.pickColor()} onClick={this.onButtonSubmit}>
                    {this.pickContent()}
                    <Icon {...this.pickIcon()} />
                  </Button>
                ) : (
                  <Segment fluid icon inverted textAlign="center" {...this.pickColor()}>
                    {this.pickContent()}
                    <Icon {...this.pickIcon()} />
                  </Segment>
                )}
              </div>
              <br />
              <div>
                {this.props.questbook.status === 'in_progress' ? (
                  <Button fluid icon labelPosition="right" color="blue" onClick={this.onFinishButtonSubmit}>
                    Finish this quest!
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </Item>

        <TopPortal ref={this.portalRef} header={'Success!'} description={`Quest has been added to the questbook!`} />
        <TopPortal
          ref={this.portalFailRef}
          header={'Fail!'}
          description={`We were unable to add ${this.props.questbook.name} to your questbook`}
        />
      </Segment>
    );
  }
}

export default QuestPattern;
