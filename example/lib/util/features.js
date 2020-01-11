import { assocPath } from 'ramda';

export const assocWith = key => assocPath(['with', key]);

export const withConfig = assocWith('config');

export const withRequireFeature = assocWith('require');
