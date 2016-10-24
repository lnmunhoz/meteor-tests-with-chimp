/* globals Books */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Books = new Mongo.Collection('books');
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
  },
  authorId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
}));

export default Books;
