import mongoose from 'mongoose';
import { compose, converge } from 'ramda';
import { weave } from 'ramda-adjunct';
import { Reader } from 'monet';
import { createDebug } from '../../../src/util/debug';
import { getMongoConfig } from './lens';
import { MONGO, MONGOOSE_CONNECT_OPTIONS } from './constants';
import { collectModels, loadModels } from './util';
import { setDefaultWeave, setHandlerResult } from '../../../src/lens/feature';

const debug = createDebug(MONGO);

const createMongoWeave = mongo => {
  const mongoReader = fn => Reader(mongoInstance => fn(mongoInstance));
  const wMongo = weave(mongoReader, mongo);

  return wMongo;
};

const handler = converge(
  async (config, models) => {
    const { connectionString } = config;

    debug('connecting to %s', connectionString);

    const mongo = await mongoose.connect(
      connectionString,
      MONGOOSE_CONNECT_OPTIONS,
    );

    debug('connected');

    const loadedModels = loadModels(mongo, models);

    debug('loaded models');

    const wMongo = createMongoWeave(loadedModels);

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
