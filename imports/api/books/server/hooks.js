/* globals Books */

import { Meteor } from 'meteor/meteor';

import '/imports/api/authors/authors';
import '../books';

Books.after.insert((userId, doc) => {
  Meteor.call('Authors.methods.addBook', {
    authorId: doc.authorId,
    bookId: doc._id,
  });
});

Books.after.remove((userId, doc) => {
  Meteor.call('Authors.methods.removeBook', {
    authorId: doc.authorId,
    bookId: doc._id,
  });
});
