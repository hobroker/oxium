import { getHandler, getId, getProps, setId, setProps } from '../feature';

describe('getId', () => {
  it('should return the id prop', () => {
    expect(getId({ id: 'one' })).toBe('one');
    expect(getId({ id: 'two' })).toBe('two');
  });
});

describe('setId', () => {
  it('should set the id prop', () => {
    expect(setId('one', {})).toEqual({ id: 'one' });
    expect(setId('two', {})).toEqual({ id: 'two' });
  });
});

describe('getHandler', () => {
  it('should return the handler', () => {
    expect(getHandler({ handler: 'one' })).toBe('one');
    expect(getHandler({ handler: 'two' })).toBe('two');
  });
});

describe('getProps', () => {
  it('should return the props prop', () => {
    expect(getProps({ props: 'one' })).toBe('one');
    expect(getProps({ props: 'two' })).toBe('two');
  });
});

describe('setProps', () => {
  it('should set the props prop', () => {
    expect(setProps('one', {})).toEqual({ props: 'one' });
    expect(setProps('two', {})).toEqual({ props: 'two' });
  });
});
