import { assert } from 'chai';

describe('Books:publications', () => {
  before(() => {
    server.execute(() => {
      Books.insert({ title: 'Test book 1' });
      Books.insert({ title: 'Test book 2' });
      Books.insert({ title: 'Test book 3' });
    });
  });

  after(() => {
    server.execute(() => {
      Books.remove({});
    });
  });

  it('@watch should return 3 books', () => {
    const books = server.execute(() => {
      const cursor = Meteor.server.publish_handlers.books({});
      return cursor.fetch();
    });

    assert.equal(books.length, 3);
  });

  it('@watch should return 2 books', () => {
    const books = server.execute(() => {
      const cursor = Meteor.server.publish_handlers.books({ skip: 1 });
      return cursor.fetch();
    });

    assert.equal(books.length, 2);
  });

  it('@watch should throw an error if "skip" is not a number', () => {
    const error = server.execute(() => {
      try {
        const cursor = Meteor.server.publish_handlers.books({ skip: 'Some text' });
        return cursor.fetch();
      } catch (err) {
        return err;
      }
    });

    assert.equal(error.error, 'validation-error');
    assert.equal(error.reason, 'Skip must be a number');
  });
});
