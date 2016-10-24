// import { assert } from 'chai';
//
// describe('Books:publications', () => {
//   before(() => {
//     const authorId = server.call('Authors.methods.create', { name: 'Author Test' });
//     server.call('Books.methods.create', { title: 'Book Test 1', authorId });
//     server.call('Books.methods.create', { title: 'Book Test 2', authorId });
//     server.call('Books.methods.create', { title: 'Book Test 3', authorId });
//   });
//
//   after(() => {
//     server.execute(() => {
//       Books.remove({});
//     });
//   });
//
//   it('@watch should return 3 books', () => {
//     const books = server.execute(() => {
//       const cursor = Meteor.server.publish_handlers.books({});
//       return cursor.fetch();
//     });
//
//     assert.equal(books.length, 3);
//   });
//
//   it('@watch should return 2 books', () => {
//     const books = server.execute(() => {
//       const cursor = Meteor.server.publish_handlers.books({ skip: 1 });
//       return cursor.fetch();
//     });
//
//     assert.equal(books.length, 2);
//   });
//
//   it('@watch should throw an error if "skip" is not a number', () => {
//     const error = server.execute(() => {
//       try {
//         const cursor = Meteor.server.publish_handlers.books({ skip: 'Some text' });
//         return cursor.fetch();
//       } catch (err) {
//         return err;
//       }
//     });
//
//     assert.equal(error.error, 'validation-error');
//     assert.equal(error.reason, 'Skip must be a number');
//   });
// });
