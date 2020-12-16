import axios from 'axios';
import React from 'react';

import { Header, Segment, Grid, Form, TextArea, Button, Modal, Label, GridColumn } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import QuestbookTable from './QuestbookTable';
import TopPortal from '../Utils/TopPortal';

const optionsType = [
  { key: 'a', text: 'Acitvity', value: 'Acitvity' },
  { key: 'l', text: 'Lifestyle', value: 'Lifestyle' },
];

const optionsLength = [
  { key: 'hd', text: '12', value: '12' },
  { key: 'd', text: '24', value: '24' },
  { key: 'dd', text: '48', value: '48' },
];

const optionsReward = [
  { key: 'f', text: '50', value: '50' },
  { key: 'h', text: '100', value: '100' },
  { key: 't', text: '200', value: '200' },
];

const optionsPenalty = [
  { key: 'm', text: '50', value: '50' },
  { key: 'f', text: '100', value: '100' },
  { key: 'o', text: '200', value: '200' },
];

class QuestbookList extends React.Component {
  state = {
    name: '',
    results: [],
    loading: true,
    open: false,

    name: '',
    description: '',
    type: '',
    duration: '',
    experience_reward: '',
    gold_reward: '',
    penalty: '',
    status: '',
  };

  questbookTableRef = React.createRef();
  static contextType = Store;

  getQuestbook = async () => {
    await axios({
      url: `api/questbook/${this.context.questbook_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({ results: res.data });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  handleButtonClick = async () => {
    const taskToInsert = {
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      duration: this.state.duration,
      experience_reward: this.state.experience_reward,
      gold_reward: this.state.gold_reward,
      penalty: this.state.penalty,
      status: '',
    };

    const res = await axios.put(`/api/questbook/${this.context.questbook_id}/quest`, taskToInsert).catch((err) => {
      this.setState({ open: false });
    });

    this.setState({ open: false });
  };

  onExitClick() {
    this.setState({ open: false });
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value, triedToSubmit: false });
  };

  componentDidMount() {
    this.getQuestbook();
  }

  componentDidUpdate() {
    this.questbookTableRef.current.setState({ results: this.state.results });
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Header>
            Quests
            <Modal
              open={this.state.open}
              onOpen={() => this.setState({ open: true })}
              trigger={<Button floated="right">Create Quest</Button>}
            >
              <Modal.Header>Create custom quest</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Form onSubmit={this.handleButtonClick}>
                    <Grid columns={2}>
                      <GridColumn centered>
                        <Grid.Row centered>
                          <Form.Group inline>
                            <Form.Input
                              required
                              label="Name"
                              placeholder="Quest Name"
                              name="name"
                              value={this.name}
                              onChange={this.handleInputChange}
                            />
                          </Form.Group>
                        </Grid.Row>
                        <Grid.Row centered>
                          <Form.Group inline>
                            <Form.TextArea
                              required
                              label="Description"
                              placeholder="Quest Description"
                              name="description"
                              value={this.description}
                              onChange={this.handleInputChange}
                            ></Form.TextArea>
                          </Form.Group>
                        </Grid.Row>
                      </GridColumn>
                      <GridColumn centered>
                        <Grid.Row centered>
                          <Form.Group inline>
                            <Form.Select
                              required
                              label="Type"
                              options={optionsType}
                              placeholder="Type"
                              name="type"
                              value={this.type}
                              onChange={this.handleInputChange}
                            />
                            <Form.Select
                              required
                              label="Duration"
                              options={optionsLength}
                              placeholder="Duration"
                              name="duration"
                              value={this.duration}
                              onChange={this.handleInputChange}
                            />
                          </Form.Group>
                        </Grid.Row>
                        <Grid.Row centered>
                          <Form.Group inline>
                            <Form.Select
                              required
                              label=" Experience"
                              options={optionsReward}
                              placeholder="Experience"
                              name="experience_reward"
                              value={this.experience_reward}
                              onChange={this.handleInputChange}
                            />
                            <Form.Select
                              required
                              label="Gold"
                              options={optionsReward}
                              placeholder="Gold"
                              name="gold_reward"
                              value={this.gold_reward}
                              onChange={this.handleInputChange}
                            />
                          </Form.Group>
                        </Grid.Row>
                        <Grid.Row>
                          <Form.Select
                            required
                            label="Penalty"
                            options={optionsPenalty}
                            placeholder="Penalty"
                            name="penalty"
                            value={this.penalty}
                            onChange={this.handleInputChange}
                          />
                        </Grid.Row>
                      </GridColumn>
                    </Grid>
                    <br></br>
                    <Grid textAlign="center" padded>
                      <Button type="submit" color="green">
                        Create
                      </Button>
                    </Grid>
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={() => this.onExitClick()}>
                  Exit
                </Button>
              </Modal.Actions>
            </Modal>
          </Header>
        </Segment>
        <Segment>
          <QuestbookTable ref={this.questbookTableRef} />
        </Segment>
      </div>
    );
  }
}

export default QuestbookList;
