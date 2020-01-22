import { isMongoLoaded } from './selectors';
import { debugIt } from '../../lib/util/debug';

const MONGO = 'mongo';

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

const handler = async config => {
  debugIt('config', isMongoLoaded(config));
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
};

const Mongo = {
  id: MONGO,
  handler,
};

export { MONGO };
export default Mongo;
