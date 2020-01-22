import deferHandler from '../../lib/feature/deferHandler';
import { debugIt } from '../../lib/util/debug';
import { isMongoLoaded } from '../mongo/selectors';

export const DEMO = 'demo';

const handler = () => {
  debugIt('DEMO start');
};

const Demo = deferHandler(isMongoLoaded, {
  id: DEMO,
  handler,
});

export default Demo;
