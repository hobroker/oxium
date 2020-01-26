import { compose } from 'ramda';
import { deferHandler } from '../../../src/feature';
import { debugIt } from '../../../src/util/debug';
import { isMongoLoaded } from '../mongo/lens';

export const DEMO = 'demo';

const handler = () => {
  debugIt('DEMO start');
};

const Demo = compose(deferHandler(isMongoLoaded))({
  id: DEMO,
  handler,
});

export default Demo;
