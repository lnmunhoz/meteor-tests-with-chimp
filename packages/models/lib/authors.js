import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Authors = new Mongo.Collection('authors');
Authors.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  booksId: {
    type: [String],
    defaultValue: [],
  },
}));

export default Authors;
