const mongoose = require('mongoose');

const getByMode = (prod, dev) => (process.env.NODE_ENV === 'prod' ? prod : dev);

const config = {
  host: getByMode(process.env.DB_HOST, process.env.DB_HOST_DEV),
  port: getByMode(process.env.DB_PORT, process.env.DB_PORT_DEV),
  name: getByMode(process.env.DB_NAME, process.env.DB_NAME_DEV),
  username: getByMode(process.env.DB_USER, process.env.DB_USER_DEV),
  password: getByMode(process.env.DB_PASS, process.env.DB_PASS_DEV),
  protocol: getByMode(process.env.DB_PROT, process.env.DB_PROT_DEV),
};

const setURLByMode = () => {
  if (process.env.NODE_ENV === 'dev') {
    return (mongoURL = `${config.protocol}://${config.host}:${config.port}/${config.name}`);
  } else {
    return (mongoURL = `${config.protocol}://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`);
  }
};

const connectionOnFulfilledHandler = (connection) => {
  console.log(`[MongoDB] Connection to ${mongoURL} established!`);
  return connection;
};

const connectionOnRejectedHandler = (error) => {
  console.log(`[MongoDB] Connection to ${mongoURL} failed with error: ${error}.`);
  return Promise.reject(error);
};

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connect = (options = defaultOptions) => {
  const mongoURL = setURLByMode();
  return mongoose
    .createConnection(`${mongoURL}`, options)
    .then(connectionOnFulfilledHandler, connectionOnRejectedHandler);
};

module.exports = connect;
