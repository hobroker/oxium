// import { AbstractModel } from '../../mongo';
// import { withMongoSchema } from '../../mongo/mongo-decorators';

import AbstractModel from '../../mongo/AbstractModel';
import { assignOnce } from '../../../lib/util';

@assignOnce('SCHEMA', {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
})
class Demo extends AbstractModel {}

export default Demo;
