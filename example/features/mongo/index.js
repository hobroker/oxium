import mongoose from 'mongoose';
import { converge } from 'ramda';
import { getMongoConfig } from './selectors';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from './constants';
import { debugIt } from '../../lib/util/debug';

const handler = converge(
  async config => {
    const { connectionString } = config;

    debugIt(MONGO, 'connecting to %s', connectionString);

    // eslint-disable-next-line no-unused-vars
    const mongo = await mongoose.connect(
      connectionString,
      MONGOOSE_CONNECT_OPTIONS,
    );

    debugIt(MONGO, 'connected');
  },
  [getMongoConfig],
);

const Mongo = {
  id: MONGO,
  handler,
};

export default Mongo;
