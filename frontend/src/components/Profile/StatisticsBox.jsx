import React from 'react';
import { Grid, List, Modal, Form, Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Store from '../../Store';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';

class StatisticsBox extends React.Component {
  state = {
    playing_since: '',
    quests_completed: '',
    streak: '',
    open: false,
    password: '',
    repeatPassword: '',
  };

  static contextType = Store;

  getStatistics = async () => {
    await axios({
      url: `api/statistics/${this.context.statistics_id}`,
      method: 'GET',
      headers: setHeaders(),
    }).then(
      (res) => {
        this.setState({
          playing_since: res.data.playing_since,
          quests_completed: res.data.quests_completed,
          streak: res.data.streak,
        });
      },
      (err) => {
        console.log(err);
      },
    );
  };

  putPassword = async () => {
    await axios({
      method: 'PUT',
      url: `/api/users/${this.context.me._id}/password`,
      headers: setHeaders(),
      data: {
        password: this.state.password,
      },
    }).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      },
    );
  };

  handleButtonClick = async (e) => {
    e.preventDefault();
    await this.putPassword();
    this.setState({ open: false });
  };

  componentDidMount = async () => {
    await this.getStatistics();
  };

  onExitClick() {
    this.setState({ open: false });
  }

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value, triedToSubmit: false });

  render() {
    if (!this.context.isLogged) return <Redirect to="/login" />;
    return (
      <div>
        <Grid>
          <br></br>
          <List>
            <List.Item>
              <List.Header>Playing Since</List.Header>
              {this.state.playing_since.split('T')[0]}
            </List.Item>
            <List.Item>
              <List.Header>Quests Completed</List.Header>
              {this.state.quests_completed}
            </List.Item>
            <List.Item>
              <List.Header>Streak</List.Header>
              {this.state.streak}
            </List.Item>
          </List>
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Modal
          open={this.state.open}
          onOpen={() => this.setState({ open: true })}
          trigger={<Button floated="right">Change Password</Button>}
        >
          <Modal.Header>Create a Guild</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Form onSubmit={this.handleButtonClick} inverted>
                <Grid>
                  <Grid.Row centered>
                    <Header>Current Password</Header>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Form.Group inline>
                      <Form.Input required type="password" name="current" placeholder="Current" value={this.current} />
                    </Form.Group>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Header>New Password</Header>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Form.Group inline>
                      <Form.Input
                        required
                        type="password"
                        name="password"
                        placeholder="New Password"
                        onChange={this.handleInputChange}
                        value={this.password}
                      />
                    </Form.Group>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Header>Repeat New Password</Header>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Form.Group inline>
                      <Form.Input
                        required
                        type="password"
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        onChange={this.handleInputChange}
                        value={this.repeatPassword}
                      />
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
      </div>
    );
  }
}

export default StatisticsBox;
