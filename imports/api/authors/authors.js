import { Mongo } from 'meteor/mongo';
import AuthorSchema from './schema';

Authors = new Mongo.Collection('authors');
Authors.attachSchema(AuthorSchema);
