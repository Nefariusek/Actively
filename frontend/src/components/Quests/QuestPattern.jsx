import React from 'react';
import { Segment, Step, Icon, Popup, Header, Item, Button, Label } from 'semantic-ui-react';
import Store from '../../Store';
import TopPortal from '../Utils/TopPortal';
import axios from 'axios';

class QuestPattern extends React.Component {
  constructor(props) {
    super(props);

    this.portalRef = React.createRef();
    this.portalFailRef = React.createRef();
    this.state = { open: false, fail: false };
  }

  static contextType = Store;

  handleButtonAddClick = async (e, { name }) => {
    this.setState({ open: true });

    const taskToInsert = {
      name: `${this.props.quest.name}`,
      description: `${this.props.quest.description}`,
      type: `${this.props.quest.type}`,
      duration: `${this.props.quest.duration}`,
      experience_reward: `${this.props.quest.experience_reward}`,
      gold_reward: `${this.props.quest.gold_reward}`,
      penalty: `${this.props.quest.penalty}`,
      status: '',
    };

    const res = await axios.put(`/api/questbook/${this.context.questbook_id}/quest`, taskToInsert).catch((err) => {
      this.portalFailRef.current.handleOpen();
      this.setState({ open: false });
    });

    if (res && res.status === 200) this.portalRef.current.handleOpen();
  };

  portalRef = React.createRef();

  convertToDaysAndHours(t) {
    const cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000;
    let time = t * 3600000,
      d = Math.floor(time / cd),
      h = Math.floor((time - d * cd) / ch);
    if (h === 24) {
      d++;
      h = 0;
    }
    return `${d} days ${h} hours`;
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
            {this.props.quest.name}
          </Item.Header>

          <Popup content="Type" trigger={<Label color="orange">{this.props.quest.type}</Label>} />

          <Item.Description>
            <Segment.Group>
              <Segment inverted textAlign="center" color="green" style={{ padding: '2px 0px 0px 6px' }}>
                <Header as="h5">Description</Header>
              </Segment>
              <Segment>
                {this.props.quest.description}
                <br />
              </Segment>
            </Segment.Group>
          </Item.Description>

          <Step.Group widths={4} size="tiny">
            <Step style={{ padding: '2px' }}>
              <Icon name="dot circle" color="yellow" />
              <Step.Content>
                <Step.Title>Gold</Step.Title>
                <Step.Description>{this.props.quest.gold_reward}</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="star" color="violet" />
              <Step.Content>
                <Step.Title>Experience</Step.Title>
                <Step.Description>{this.props.quest.experience_reward}</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="clock" color="teal" />
              <Step.Content>
                <Step.Title>Duration</Step.Title>
                <Step.Description>{this.props.quest.duration} hours</Step.Description>
              </Step.Content>
            </Step>
            <Step style={{ padding: '2px' }}>
              <Icon name="warning circle" color="red" />
              <Step.Content>
                <Step.Title>Penalty</Step.Title>
                <Step.Description>{this.props.quest.penalty} hp</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>

          <Item.Extra>
            <Button
              fluid
              icon
              color={this.state.open === false ? 'blue' : 'green'}
              labelPosition="right"
              onClick={this.handleButtonAddClick}
              disabled={this.state.open}
            >
              <Icon name={this.state.open === false ? 'plus' : 'check'} />
              {this.state.open === false ? 'Add to questbook' : 'Added to questbook'}
            </Button>
          </Item.Extra>
        </Item>

        <TopPortal ref={this.portalRef} header={'Success!'} description={`Quest has been added to the questbook!`} />
        <TopPortal
          ref={this.portalFailRef}
          header={'Fail!'}
          description={`We were unable to add ${this.props.quest.name} to your questbook`}
        />
      </Segment>
    );
  }
}

export default QuestPattern;
