import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
