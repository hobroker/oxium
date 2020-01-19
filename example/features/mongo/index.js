import mongoose from 'mongoose';
import { compose, forEach, converge, curry, map, defaultTo } from 'ramda';
import { string } from 'yup';
import { withConfig } from '../../lib/feature/withConfig';
import { setId } from '../../lib/selectors/feature';
import { getConfig } from '../../lib/selectors/params';
import mongoSubject from './mongoSubject';
import { withModels } from './withModels';
import { getModels } from './selectors';
import { getModelMeta } from './util';

const MONGO = 'mongo';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const prepareModels = map(getModelMeta);

const loadModels = curry((mongo, models) =>
  forEach(({ Model, schema, name }) => {
    mongo.model(Model, schema, name);
  }, models),
);

const handler = converge(
  async (config, models) => {
    console.log('config', config);
    // const { connectionString } = config;
    //
    // console.log('connecting to %s', connectionString);
    //
    // const mongo = await mongoose.connect(connectionString, options);
    //
    // console.log('connected');
    //
    // compose(loadModels(mongo), prepareModels)(models);
    //
    // mongoSubject.next(mongo);

    return () => {
      console.log('Mongo onUnload ...args2');
      mongoSubject.complete();
    };
  },
  [getConfig, compose(defaultTo([]), getModels)],
);

const Mongo = compose(
  setId(MONGO),
  withConfig({
    connectionString: string().required(),
  }),
  withModels([]),
)({ handler });

export { mongoSubject };
export { MONGO };
export default Mongo;
