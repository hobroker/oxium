"use strict";

var _benchmark = require("../benchmark");

var _promise = require("../promise");

var _ = require("..");

describe('resolveInChunks', () => {
  it('should resolve in chunks of 2 in 700-715ms', async () => {
    const time = (0, _benchmark.debugItTime)();
    await (0, _.resolveInChunks)(2, [() => (0, _promise.wait)(100), () => (0, _promise.wait)(300), () => (0, _promise.wait)(400), () => (0, _promise.wait)(100)]);
    const ms = time();
    expect(ms).toBeGreaterThanOrEqual(700);
    expect(ms).toBeLessThanOrEqual(715);
  });
});