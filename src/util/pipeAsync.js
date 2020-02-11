import { andThen, call, pipeWith, unapply, useWith } from 'ramda';
import { resolveP } from 'ramda-adjunct';

const pipeAsync = unapply(pipeWith(useWith(call, [andThen, resolveP])));

export default pipeAsync;
