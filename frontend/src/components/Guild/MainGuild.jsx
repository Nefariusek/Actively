import axios from 'axios';
import React from 'react';

import { Button, Header, Segment, Modal, Form, Grid, TextArea, List } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

class MainGuild extends React.Component {
  state = {
    name: '',
    description: 'Guild description',
    main_guild_description: '',
    main_guild_members: 0,
    main_guild_name: '',
    main_guild_leader: '',
    loading: true,
    open: false,
  };

  static contextType = Store;

  getGuilds = async () => {
    await axios({
      url: `api/social/${this.context.social_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (response) => {
        this.setState({ main_guild: response.data.main_guild });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getLeaderName = async (leader) => {
    await axios({
      url: `api/characters/${leader}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      async (response) => {
        this.setState({
          main_guild_leader: response.data.name,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  getMainGuild = async () => {
    await axios({
      url: `api/guilds/${this.state.main_guild}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      async (response) => {
        this.setState({
          main_guild_description: response.data.description,
          main_guild_members: response.data.members.length,
          main_guild_name: response.data.name,
        });
        await this.getLeaderName(response.data.leader);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  putMainGuild = async (mainID) => {
    await axios({
      url: `api/social/${this.context.social_id}/main_guild`,
      method: 'put',
      data: { main_guild: mainID },
      headers: setHeaders(),
    }).then(
      (response) => {},
      (error) => {
        console.log(error);
      },
    );
  };

  postGuild = async () => {
    await axios({
      url: 'api/guilds',
      method: 'post',
      headers: setHeaders(),
      data: {
        name: this.state.name,
        description: this.state.description,
        leader: this.context.character_id,
        members: [this.context.character_id],
      },
    }).then(
      async (response) => {
        await this.putMainGuild(response.data._id);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  handleButtonClick = async () => {
    await this.postGuild();
    this.setState({ open: false });
  };

  onExitClick() {
    this.setState({ open: false });
  }

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value, triedToSubmit: false });

  componentDidMount = async () => {
    await this.getGuilds();
    await this.getMainGuild();
  };

  render() {
    return (
      <Segment inverted>
        <Header>
          Main Guild
          <Modal
            open={this.state.open}
            onOpen={() => this.setState({ open: true })}
            trigger={<Button floated="right">Create Guild</Button>}
          >
            <Modal.Header>Create a Guild</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Form onSubmit={this.handleButtonClick} inverted>
                  <Grid>
                    <Grid.Row centered>
                      <Header>Guild Name</Header>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Form.Group inline>
                        <Form.Input
                          required
                          placeholder="Guild Name"
                          name="name"
                          value={this.name}
                          onChange={this.handleInputChange}
                        />
                      </Form.Group>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Header>Guild Description</Header>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Form.Group inline>
                        <Form.Field>
                          <TextArea
                            placeholder="Guild Description"
                            name="description"
                            value={this.description}
                            onChange={this.handleInputChange}
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
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => this.onExitClick()}>
                Exit
              </Button>
            </Modal.Actions>
          </Modal>
        </Header>
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <List.Item>
                <List.Header>Guild Name:</List.Header>
                {this.state.main_guild_name}
              </List.Item>
              <List.Item>
                <List.Header>Members:</List.Header>
                {this.state.main_guild_members}
              </List.Item>
            </Grid.Column>
            <Grid.Column>
              <List.Item>
                <List.Header>Description</List.Header>
                {this.state.main_guild_description}
              </List.Item>
              <List.Item>
                <List.Header>Leader</List.Header>
                {this.state.main_guild_leader}
              </List.Item>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
    );
  }
}

export default MainGuild;
