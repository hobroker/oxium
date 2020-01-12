import { assoc, compose } from 'ramda';
import { Subject } from 'rxjs';
import { string } from 'yup';
import { withConfig } from '../../lib/feature/withConfig';
import { setId } from '../../lib/selectors/feature';

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
  setId(MONGO),
  withConfig({
    connectionString: string().required(),
  }),
)({ handler });

export { mongoSubject };
export { MONGO };
export default Mongo;
