import { compose, keys } from 'ramda';
import { wait } from '../../../src/util';
import { debugIt } from '../../lib/util/debug';
import { setId } from '../../lib/selectors/feature';
import { resolveInChunks } from '../../lib/util';

const DEMO = 'demo';

const handler = async app => {
  debugIt('Demo start', keys(app));
  // await wait(2000);

  await resolveInChunks(2, [
    () => wait(1000).then(debugIt),
    () => wait(3000).then(debugIt),
    () => wait(1000).then(debugIt),
  ]);

  return '1';
};

const Demo = compose(setId(DEMO))({ handler });

export { DEMO };
export default Demo;
