import { compose, converge, T } from 'ramda';
import { getMongoConfig } from './selectors';
import deferHandler from '../../lib/feature/deferHandler';
import { debugIt } from '../../lib/util/debug';

export const MONGO = 'mongo';

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
//
// const prepareModels = map(getModelMeta);
//
// const loadModels = curry((mongo, models) =>
//   forEach(({ Model, schema, name }) => {
//     mongo.model(Model, schema, name);
//   }, models),
// );

const handler = converge(
  async config => {
    debugIt('config', config);
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
  },
  [getMongoConfig],
);

const Mongo = compose(deferHandler(T))({
  id: MONGO,
  handler,
});

export default Mongo;
