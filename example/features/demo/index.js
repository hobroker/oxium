import { compose } from 'ramda';
import { debugIt } from '../../lib/util/debug';
import deferHandler from '../../lib/feature/deferHandler';
import { isMongoLoaded } from '../mongo/selectors';

export const DEMO = 'demo';

const handler = () => {
  debugIt('DEMO start');
};

const Demo = compose(deferHandler(isMongoLoaded))({
  id: DEMO,
  handler,
});

export default Demo;
