import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  name: {
    type: String,
  },
  booksId: {
    type: [String],
    defaultValue: [],
  },
});
