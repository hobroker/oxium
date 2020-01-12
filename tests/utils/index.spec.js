import { mapTo, resolveSequentially, wait } from '../../src/util';

describe('mapTo', () => {
  it('should modify the object according to the map provided', () => {
    const map = { port: 'PORT' };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ port: 3000 });
  });

  it('should modify the object according to the nested map provided', () => {
    const map = {
      nested: {
        port: 'PORT',
      },
    };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ nested: { port: 3000 } });
  });

  it('should modify the object according to function provided in map', () => {
    const map = {
      nested: {
        port: obj => obj.PORT + 1,
      },
    };
    const obj = { PORT: 3000 };
    expect(mapTo(map, obj)).toEqual({ nested: { port: 3001 } });
  });
});

describe('resolveSequentially', () => {
  it('should resolve sequentially the promises', async () => {
    const fn = i => new Promise(r => setTimeout(() => r(i), i * 100));
    const array = [1, 2];

    await expect(resolveSequentially(fn, array)).resolves.toBe(
      array[array.length - 1],
    );
  });
});

describe('wait', () => {
  it('should wait 100ms', async () => {
    await expect(wait(100)).resolves.toBe(100);
  });
});
