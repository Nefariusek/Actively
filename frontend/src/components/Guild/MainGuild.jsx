import axios from 'axios';
import React from 'react';

import { Button, Header, Segment, Modal, Form, Grid, TextArea, List } from 'semantic-ui-react';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';

const listOfPlayers = [];
class MainGuild extends React.Component {
  state = {
    name: '',
    description: 'Guild description',
    main_guild_description: '',
    main_guild_members: 0,
    main_guild_name: '',
    main_guild_leader: '',
    main_guild_id: '',

    member_id: '',

    loading: true,
    open: false,
    openInvite: false,
    players: '',
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
          main_guild_id: response.data._id,
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

  getCharacters = async () => {
    await axios({
      url: `api/characters`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        console.log(res.data);
        res.data.forEach((player) => {
          let char = { key: player._id, text: player.name, value: player._id };
          listOfPlayers.push(char);
        });
        this.setState({ players: res.data });
        console.log(listOfPlayers);
      },
      (err) => {
        console.log(err);
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

  handleInviteClick = async () => {
    const memberToInsert = { member: this.state.member_id };

    const res = await axios.put(`/api/guilds/${this.state.main_guild_id}/members`, memberToInsert).catch((err) => {
      this.setState({ open: false });
    });

    this.setState({ openInvite: false });
  };

  onExitInviteClick() {
    this.setState({ openInvite: false });
  }

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value, triedToSubmit: false });

  componentDidMount = async () => {
    await this.getGuilds();
    await this.getMainGuild();
    await this.getCharacters();
  };

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (this.state.open !== prevState.open || this.state.openInvite !== prevState.openInvite) {
      await this.getGuilds();
      await this.getMainGuild();
      await this.getCharacters();
    }
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
          <Modal
            open={this.state.openInvite}
            onOpen={() => this.setState({ openInvite: true })}
            trigger={<Button floated="right">Invite</Button>}
          >
            <Modal.Header>Invite member</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Form onSubmit={this.handleInviteClick} inverted>
                  <Grid>
                    <Grid.Row centered>
                      <Header>Player Name</Header>
                    </Grid.Row>
                    <Grid.Row centered>
                      <Form.Group inline>
                        <Form.Select
                          required
                          label="Type"
                          options={listOfPlayers}
                          placeholder="Type"
                          name="member_id"
                          value={this.member_id}
                          onChange={this.handleInputChange}
                        />
                      </Form.Group>
                    </Grid.Row>
                  </Grid>
                  <Grid textAlign="center" padded>
                    <Button type="submit" color="green">
                      Invite
                    </Button>
                  </Grid>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => this.onExitInviteClick()}>
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
