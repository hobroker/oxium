import { debugIt } from '../../../src/util/debug';

const SECOND = 'second';

const handler = () => {
  debugIt('SECOND start');
};

const Second = {
  id: SECOND,
  handler,
};

export { SECOND };
export default Second;
