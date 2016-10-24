import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import '../books';

export const createBook = new ValidatedMethod({
  name: 'Books.methods.create',
  validate: new SimpleSchema({
    title: {
      type: String,
    },
  }).validator(),
  run({ title }) {
    return Books.insert({
      title,
      createdAt: new Date(),
    });
  },
});

export const deleteBook = new ValidatedMethod({
  name: 'Books.methods.delete',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    return Books.remove({ _id });
  },
});
