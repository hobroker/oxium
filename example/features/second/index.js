import { debugIt } from '../../../src/util/debug';
import { shareMongoModels } from '../mongo/lens';
import * as models from './models';

const SECOND = 'second';

const handler = () => {
  debugIt('SECOND start');
};

const Second = shareMongoModels(models)({
  id: SECOND,
  handler,
});

export { SECOND };
export default Second;
