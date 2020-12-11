import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class CheckboxToggle extends React.Component {
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
    return <Checkbox toggle />;
  }
}

export default CheckboxToggle;
