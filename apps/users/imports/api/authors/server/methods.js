/* global Authors, Books */
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Authors, Books } from 'meteor/lnmunhoz:models';

export const createAuthor = new ValidatedMethod({
  name: 'Authors.methods.create',
  validate: new SimpleSchema({
    name: { type: String },
  }).validator(),
  run({ name }) {
    return Authors.insert({ name });
  },
});

export const addBook = new ValidatedMethod({
  name: 'Authors.methods.addBook',
  validate: new SimpleSchema({
    authorId: { type: String },
    bookId: { type: String },
  }).validator(),
  run({ authorId, bookId }) {
    const book = Books.findOne(bookId);

    if (!book) {
      throw new Meteor.Error(
        404,
        'Book not found',
        'Book could not be added to author because did not exist or was deleted.'
      );
    }

    return Authors.update(authorId, {
      $addToSet: {
        booksId: bookId,
      },
    });
  },
});

export const removeBook = new ValidatedMethod({
  name: 'Authors.methods.removeBook',
  validate: new SimpleSchema({
    authorId: { type: String },
    bookId: { type: String },
  }).validator(),
  run({ authorId, bookId }) {
    return Authors.update(authorId, {
      $pull: {
        booksId: bookId,
      },
    });
  },
});
