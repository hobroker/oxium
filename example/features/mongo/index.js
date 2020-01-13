import mongoose from 'mongoose';
import { compose } from 'ramda';
import { string } from 'yup';
import { withConfig } from '../../lib/feature/withConfig';
import { setId } from '../../lib/selectors/feature';
import { getConfig } from '../../lib/selectors/params';
import mongoSubject from './mongoSubject';

const MONGO = 'mongo';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handler = async (props, rest) => {
  const config = getConfig(props);
  console.log('...rest', rest);
  const { connectionString } = config;

  console.log('connecting to %s', connectionString);

  const mongo = await mongoose.connect(connectionString, options);

  console.log('connected');

  mongoSubject.next(mongo);

  return () => {
    console.log('Mongo onUnload ...args2');
    mongoSubject.complete();
  };
};

const Mongo = compose(
  setId(MONGO),
  withConfig({
    connectionString: string().required(),
  }),
)({ handler });

export { mongoSubject };
export { MONGO };
export default Mongo;
