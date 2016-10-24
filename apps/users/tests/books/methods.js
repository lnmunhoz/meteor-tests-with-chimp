import { assert, expect } from 'chai';

describe('Books:methods', () => {
  let authorId;

  before(() => {
    console.log('--- Running before ---');
    authorId = server.execute(() => {
      return Meteor.call('Authors.methods.create', {
        name: 'Author Tester',
      });
    });
    console.log('--- End before ---');
  });

  after(() => {
    console.log('--- Running after ---');
    // server.execute(() => {
    //   Books.remove({});
    //   Authors.remove({});
    // });
    //
    console.log('--- End after ---');
  });

  describe('createBook()', () => {
    let bookId;

    it('@watch creates a book and add ref to author', () => {
      bookId = server.execute((authorId) => {
        console.log(authorId);
        return Meteor.call('Books.methods.create', {
          authorId,
          title: 'A book for test',
        });
      }, authorId);

      const bookAdded = server.execute((bookId) => {
        return Books.findOne(bookId);
      }, bookId);

      const author = server.execute(authorId =>
         Authors.findOne(authorId), authorId);

      assert.equal(bookAdded.title, 'A book for test');
      assert.include(author.booksId, bookId);
    });

    it('@watch throw exception if book has no title', () => {
      try {
        server.call('Books.methods.create', {
          authorId,
          title: undefined,
        });
      } catch (err) {
        assert.equal(err.reason, 'Title is required');
      }
    });

    it('@watch throw exception if book has no authorId', () => {
      try {
        server.call('Books.methods.create', {
          authorId: undefined,
          title: 'A nice book',
        });
      } catch (err) {
        assert.equal(err.reason, 'Author id is required');
      }
    });

    it("@watch throw exception if author doesn't exist", () => {
      try {
        server.call('Books.methods.create', {
          authorId: 'abcdefghijklmno',
          title: 'A great title',
        });
      } catch (err) {
        assert.equal(err.reason, 'Author not found');
      }
    });

    it('@watch throw exception if book is an empty object', () => {
      try {
        server.call('Books.methods.create', {});
      } catch (err) {
        assert.equal(err.error, 'validation-error');
      }
    });
  });

  describe('deleteBook()', () => {
    let bookId;
    before(() => {
      console.log('--- deleteBook():Running before ---');
      bookId = server.execute((authorId) => {
        return Meteor.call('Books.methods.create', {
          authorId,
          title: 'A book to be deleted',
        });
      }, authorId);

      assert.isDefined(bookId);
    });


    it('@watch deletes a book and its ref on author', () => {
      server.call('Books.methods.delete', { _id: bookId });
      const book = server.execute((bookId) => {
        return Books.findOne(bookId);
      }, bookId);

      const author = server.execute((authorId) => {
        return Authors.findOne(authorId);
      }, authorId);

      assert.isUndefined(book);
      assert.notInclude(author.booksId, bookId);
    });
  });
});
