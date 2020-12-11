import React from 'react';
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react';

class TopPortal extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { portalOpen: false };
  }

  handleClose = () => this.setState({ portalOpen: false });

  handleOpen = async () => {
    this._isMounted = true;
    this.setState({ portalOpen: true });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    if (this._isMounted) this.setState({ portalOpen: false });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <TransitionablePortal
        open={this.state.portalOpen}
        onClose={this.handleClose}
        transition={{ animation: 'fly right', duration: '1500' }}
      >
        <Segment
          style={{
            left: '10px',
            position: 'fixed',
            bottom: '10px',
            zIndex: 1000,
          }}
        >
          <Header textAlign="center">{this.props.header}</Header>
          <p>{this.props.description}</p>

          <Button color="green" content="Close" onClick={this.handleClose} fluid />
        </Segment>
      </TransitionablePortal>
    );
  }
}

export default TopPortal;
