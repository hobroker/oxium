import { compose } from 'ramda';
import { deferHandler } from '../../../src/feature';
import { debugIt } from '../../../src/util';
import {
  getDefaultMongoWeave,
  isMongoLoaded,
  shareMongoModels,
} from '../mongo/lens';
import * as models from './models';
import { getAllDemoDocs } from './mongo-actions';

export const DEMO = 'demo';

const handler = async app => {
  const wMongo = getDefaultMongoWeave(app);
  debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

const Demo = compose(
  deferHandler(isMongoLoaded),
  shareMongoModels(models),
)({
  id: DEMO,
  handler,
});

export default Demo;
