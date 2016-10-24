import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import '../books';

Meteor.publish('books', ({ skip = 0, limit = 100 }) => {
  new SimpleSchema({
    skip: { type: Number },
    limit: { type: Number },
  }).validate({ skip, limit });

  return Books.find({}, { skip, limit });
});
