import { allPass, compose, not, when } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { Either, Right } from 'monet';

export const isEither = allPass([isNotUndefined, Either.isOfType]);
export const isNotEither = compose(not, isEither);

export const ensureEitherOr = when(isNotEither);
export const ensureEitherOrRight = ensureEitherOr(Right);
