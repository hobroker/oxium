import { compose } from 'ramda';
import { deferHandler } from '../../../src/feature';
import { debugIt } from '../../../src/util/debug';
import { isMongoLoaded, shareMongoModels } from '../mongo/lens';
import * as models from './models';

export const DEMO = 'demo';

const handler = () => {
  debugIt('DEMO start');
};

const Demo = compose(
  deferHandler(isMongoLoaded),
  shareMongoModels(models),
)({
  id: DEMO,
  handler,
});

export default Demo;
