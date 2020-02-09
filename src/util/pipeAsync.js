import { andThen, call, pipeWith, unapply, useWith } from 'ramda';
import { ensurePromise } from './promise';

const pipeAsync = unapply(pipeWith(useWith(call, [andThen, ensurePromise])));

export default pipeAsync;
