import { compose } from 'ramda';
import { noop } from 'rxjs';
import { MONGO } from '../mongo';
import { withRequireFeature } from '../../lib/feature/withRequireFeature';
import { setId } from '../../lib/selectors/feature';
import { withModels } from '../mongo/withModels';
import * as models from './models';

const DEMO = 'demo';

const handler = noop;

const Demo = compose(
  setId(DEMO),
  withModels(models),
  withRequireFeature(MONGO),
)({ handler });

export { DEMO };

export default Demo;
