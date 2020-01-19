import { compose, map } from 'ramda';
import Demo from './features/demo';
import { applyToLater } from './lib/util';
import { resolveInChunks } from './lib/util/resolveInChunks';
import { getHandler } from './lib/selectors/feature';
import { getFeatures } from './lib/selectors/params';
import config from './config';

const features = [Demo];

(async () => {
  const applyFeaturesHandler = app =>
    compose(
      resolveInChunks(2),
      map(compose(applyToLater([app]), getHandler)),
      getFeatures,
    )(app);

  const data = {
    result: await applyFeaturesHandler({ config, features }),
  };

  console.log('data', data);
})();
