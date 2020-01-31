import debug from 'debug';
import { apply, compose, unapply } from 'ramda';

const baseDebug = debug('app');

const debugIt = baseDebug;

const createDebug = compose(unapply, apply, ::debugIt.extend);

const debugItFp = createDebug('fp');

export { createDebug, debugIt, debugItFp };
