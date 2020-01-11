import { assoc, compose } from 'ramda';
import { MONGO } from '../mongo';
import { withRequireFeature } from '../../lib/util/features';

const DEMO = 'demo';

const Demo = compose(assoc('id', DEMO), withRequireFeature(MONGO))({});

export { DEMO };

export default Demo;
