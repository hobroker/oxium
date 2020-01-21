import { compose, converge, T } from 'ramda';
import deferHandler from '../../lib/feature/deferHandler';
import { getMongoConfig } from './selectors';
import { debugIt } from '../../lib/util/debug';

export const DEMO = 'demo';

const handler = converge(debugIt, [getMongoConfig]);

const Demo = compose(deferHandler(T))({
  id: DEMO,
  handler,
});

export default Demo;
