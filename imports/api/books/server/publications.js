import { Meteor } from 'meteor/meteor';
import '../books';

Meteor.publish('books', () => {
  return Books.find();
});
