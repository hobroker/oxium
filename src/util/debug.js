import debug from 'debug';
import { compose, unapply } from 'ramda';

export const debugIt = debug('app');

export const createDebug = ::debugIt.extend;

export const debugItFp = compose(unapply, createDebug)('fp');
