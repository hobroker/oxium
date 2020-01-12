import { lensProp, set, view } from 'ramda';

export const idLens = lensProp('id');
export const handlerLens = lensProp('handler');
export const propsLens = lensProp('props');

export const getId = view(idLens);
export const setId = set(idLens);

export const getHandler = view(handlerLens);

export const getProps = view(propsLens);
export const setProps = set(propsLens);
