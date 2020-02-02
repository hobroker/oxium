import debug from 'debug';
import { apply, compose, tap, unapply } from 'ramda';
import { PKG_NAME } from '../constants';

const baseDebug = debug(PKG_NAME);

const debugIt = baseDebug;

const createDebug = compose(unapply, apply, ::debugIt.extend);

const debugItFp = tap(createDebug('fp'));

export { createDebug, debugIt, debugItFp };
