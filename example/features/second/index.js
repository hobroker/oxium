import { compose, keys, T } from 'ramda';
import { debugIt } from '../../lib/util/debug';
import deferHandler from '../../lib/feature/deferHandler';

const SECOND = 'second';

const handler = app => {
  debugIt('SECOND start', keys(app));
};

const Second = compose(deferHandler(T))({
  id: SECOND,
  handler,
});

export { SECOND };
export default Second;
