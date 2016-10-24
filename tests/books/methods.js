import { assert, expect } from 'chai';

describe('Books:methods', () => {
  after(() => {
    server.execute(() => {
      Books.remove({});
    });
  });

  let bookId;

  it('creates a book @watch', () => {
    bookId = server.execute(() => {
      return Meteor.call('Books.methods.create', { title: 'A book from test' });
    });

    const bookAdded = server.execute((bookId) => {
      return Books.findOne({ _id: bookId });
    }, bookId);

    assert.equal(bookAdded.title, 'A book from test');
  });

  it('throw exception if book has no title @focus', () => {
    try {
      server.call('Books.methods.create', { title: undefined });
    } catch (err) {
      assert.equal(err.reason, 'Title is required');
    }
  });

  it('deletes a book @watch', () => {
    server.call('Books.methods.delete', { _id: bookId });
    const book = server.execute((bookId) => {
      return Books.findOne(bookId);
    }, bookId);

    assert.isUndefined(book);
  });
});
