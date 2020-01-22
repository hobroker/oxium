import { wait } from '../../../../src/util';
import { debugItTime } from '../benchmark';
import { resolveInChunks } from '../resolveInChunks';

it('should resolve in chunks of 2 in in 700-710ms', async () => {
  const time = debugItTime();
  await resolveInChunks(2, [
    () => wait(100),
    () => wait(300),
    () => wait(400),
    () => wait(100),
  ]);
  const ms = time();
  expect(ms).toBeGreaterThanOrEqual(700);
  expect(ms).toBeLessThanOrEqual(710);
});
