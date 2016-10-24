import { Mongo } from 'meteor/mongo';
import BookSchema from './schema';

Books = new Mongo.Collection('books');
Books.attachSchema(BookSchema);
