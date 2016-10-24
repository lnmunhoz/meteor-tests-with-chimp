/* globals Books, Authors */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import '/imports/api/authors/authors';
import '../books';

export const createBook = new ValidatedMethod({
  name: 'Books.methods.create',
  validate: new SimpleSchema({
    title: { type: String },
    authorId: { type: String },
  }).validator(),
  run({ title, authorId }) {
    const author = Authors.findOne(authorId);

    if (!author) {
      throw new Meteor.Error(
        404,
        'Author not found',
        `Could not add book ${title} because author is not in the database.`
      );
    }

    return Books.insert({ title, authorId, createdAt: new Date() });
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
