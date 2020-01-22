import {
  applyTo,
  compose,
  filter,
  map,
  mergeRight,
  not,
  pipe,
  take,
  then,
} from 'ramda';
import { noop } from 'rxjs';
import config from './config';
import { setDefaultMeta, resolveHandlers } from './lib';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';
import { getFeatures } from './lib/selectors/app';
import { isFeatureLoaded } from './lib/selectors/feature';
import { toPromise } from './lib/util';

const features = [Demo, Second, Mongo];
const app = {
  config,
  features: map(setDefaultMeta, features),
};

const takeFn = compose(take(2), filter(compose(not, isFeatureLoaded)));
const callFn = compose(applyTo, mergeRight(app));
const runHandlers = resolveHandlers(takeFn, callFn);

const runApp = pipe(getFeatures, runHandlers, toPromise, then(noop));

runApp(app);
