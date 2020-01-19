import { compose, lensPath, set, view } from 'ramda';
import { propsLens } from '../../lib/selectors/feature';

export const modelsLens = lensPath(['models']);

export const propsModelsLens = compose(propsLens, modelsLens);

export const getModels = view(modelsLens);
export const setModels = set(modelsLens);

export const getPropsModels = view(propsModelsLens);
