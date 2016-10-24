/* globals Books */

import { Meteor } from 'meteor/meteor';
import { Books } from 'meteor/lnmunhoz:models';

Books.after.insert(function (userId, doc) {
  const book = this.transform();

  Meteor.call('Authors.methods.addBook', {
    authorId: doc.authorId,
    bookId: this._id,
  });
});

Books.after.remove((userId, doc) => {
  Meteor.call('Authors.methods.removeBook', {
    authorId: doc.authorId,
    bookId: doc._id,
  });
});
