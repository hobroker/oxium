import * as yup from 'yup';
import { configVisitor } from '../../src/module';

describe('configVisitor', () => {
  const moduleId = 'one';
  const module = {
    id: moduleId,
    configValidationSchema: {
      name: yup.string().required(),
      age: yup.number().default(18),
    },
  };

  it('should return expected config', () => {
    const params = {
      app: {
        config: {
          modules: {
            [moduleId]: {
              name: 'Alice',
            },
          },
        },
      },
    };

    expect(configVisitor(module, params)).toEqual({
      name: 'Alice',
      age: 18,
    });
  });

  it('should return a ValidationError', () => {
    const params = { app: {} };

    expect(() => configVisitor(module, params)).toThrow(
      'name is a required field',
    );
  });
});
