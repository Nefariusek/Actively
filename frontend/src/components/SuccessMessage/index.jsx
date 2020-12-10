import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Message } from 'semantic-ui-react';

const SuccessMessage = (props) => {
  return <Message content={props.message} success />;
};

export default SuccessMessage;
