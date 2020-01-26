import debug from 'debug';
import { tap } from 'ramda';

const appDebug = debug('app');

export const createDebug = key => appDebug.extend(key);

export const debugIt = (...args) => appDebug(...args);

const debugFp = createDebug('fp');
export const debugItFp = tap((...args) => debugFp(args));
