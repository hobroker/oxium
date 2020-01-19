import { compose, keys } from 'ramda';
import { debugIt } from '../../lib/util/debug';
import { setId } from '../../lib/selectors/feature';

const DEMO = 'demo';

const handler = async app => {
  debugIt('Demo start', keys(app));
  // await wait(2000);

  return '1';
};

const Demo = compose(setId(DEMO))({ handler });

export { DEMO };
export default Demo;
