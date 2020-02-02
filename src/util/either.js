import { allPass, compose, not, when } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { Either, Right } from 'monet';

const isEither = allPass([isNotUndefined, Either.isOfType]);
const isNotEither = compose(not, isEither);

const ensureEitherOr = when(isNotEither);
const ensureEitherOrRight = ensureEitherOr(Right);

export { isEither, isNotEither, ensureEitherOr, ensureEitherOrRight };
