import { debugItTime } from '../benchmark';
import { resolveInChunks } from '../resolveInChunks';
import { wait } from '../index';

describe('resolveInChunks', () => {
  it('should resolve in chunks of 2 in 700-715ms', async () => {
    const time = debugItTime();
    await resolveInChunks(2, [
      () => wait(100),
      () => wait(300),
      () => wait(400),
      () => wait(100),
    ]);
    const ms = time();
    expect(ms).toBeGreaterThanOrEqual(700);
    expect(ms).toBeLessThanOrEqual(715);
  });
});
