import debug from 'debug';
import { apply, bind, compose, tap, unapply } from 'ramda';
import { PKG_NAME } from '../constants';

const baseDebug = debug(PKG_NAME);

const debugIt = baseDebug;

const extend = bind(debugIt.extend, debugIt);

const createDebug = compose(unapply, apply, extend);

const debugItFp = tap(createDebug('fp'));

export { createDebug, debugIt, debugItFp };
