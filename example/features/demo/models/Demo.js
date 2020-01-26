import AbstractModel, { withSchema } from '../../mongo/AbstractModel';

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

export default withSchema(schema, Demo);
