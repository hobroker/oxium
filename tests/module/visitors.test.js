import { pickVisitors } from '../../src/module/visitors';

describe('pickVisitors', () => {
  it('should return picked visitors from each module', () => {
    const modules = [
      {
        visitors: ['A', 'B'],
      },
      {
        visitors: ['D'],
      },
    ];

    expect(pickVisitors(modules)).toEqual(['A', 'B', 'D']);
  });
});
