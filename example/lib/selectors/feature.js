import { identity, lensProp, prop, set, useWith, view } from 'ramda';

export const idLens = lensProp('id');
export const handlerLens = lensProp('handler');
export const propsLens = lensProp('props');
export const withLens = lensProp('with');
export const evaluatorsLens = lensProp('evaluators');

export const getId = view(idLens);
export const setId = set(idLens);

export const getHandler = view(handlerLens);
export const setHandler = set(handlerLens);

export const getProps = view(propsLens);
export const setProps = set(propsLens);

export const getWith = view(withLens);

export const getWithProp = useWith(prop, [identity, getWith]);
