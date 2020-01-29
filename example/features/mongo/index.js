import mongoose from 'mongoose';
import { compose, converge } from 'ramda';
import { weave } from 'ramda-adjunct';
import { setDefaultWeave, setHandlerResult } from '../../../src/lens/feature';
import { createDebug, callReader } from '../../../src/util';
import { getMongoConfig } from './lens';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from './constants';
import { collectModels, loadModels } from './util';
// import { getAllDemoDocs } from '../demo/actions';

const debug = createDebug(MONGO);

const handler = converge(
  async (config, models) => {
    mongoose.Promise = Promise;
    const { connectionString } = config;

    debug('connecting to %s', connectionString);

    const mongo = await mongoose.connect(
      connectionString,
      MONGOOSE_CONNECT_OPTIONS,
    );

    debug('connected');

    const loadedModels = loadModels(mongo, models);

    debug('loaded models');

    const wMongo = weave(callReader, loadedModels);

    // console.log(await wMongo(getAllDemoDocs()));

    return compose(setDefaultWeave(wMongo), setHandlerResult(mongo));
  },
  [getMongoConfig, collectModels],
);

const Mongo = {
  id: MONGO,
  handler,
};

export AbstractModel from './AbstractModel';

export { debug as debugMongo };

export default Mongo;
