import { assoc, compose } from 'ramda';
import { Subject } from 'rxjs';
import { string } from 'yup';
import { withConfig } from '../../lib/util/features';

const mongoSubject = new Subject();

const MONGO = 'mongo';

const handler = props => {
  console.log('Mongo props', props);

  mongoSubject.next();

  return () => {
    console.log('Mongo onUnload ...args2');
    mongoSubject.complete();
  };
};

const Mongo = compose(
  assoc('id', MONGO),
  withConfig({
    connectionString: string().required(),
  }),
)({ handler });

export { mongoSubject };
export { MONGO };
export default Mongo;
