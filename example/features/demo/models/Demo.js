import { AbstractModel } from '../../mongo';
import { setSchema } from '../../mongo/lens';

class Demo extends AbstractModel {}

const schema = {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
};

export default setSchema(schema, Demo);
