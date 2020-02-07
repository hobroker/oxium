import {
  apply,
  applyTo,
  compose,
  flip,
  head,
  ifElse,
  is,
  reduce,
  tail,
  then,
  unless,
} from 'ramda';
import { toPromise } from './async';

const _pipeAsync = (f, g) => (...args) => {
  const gPromise = compose(unless(is(Promise), toPromise), flip(applyTo)(g));

  return compose(ifElse(is(Promise), then(gPromise), gPromise), apply(f))(args);
};

function pipeAsync(...args) {
  return reduce(_pipeAsync, head(args), tail(args));
}

export default pipeAsync;
