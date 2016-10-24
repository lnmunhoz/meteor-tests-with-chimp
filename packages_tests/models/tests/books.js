describe('Models:books', () => {
  it('@watch Books collection should have name "books"', () => {
    const collectionName = server.execute(() => {
      return Books._name;
    });

    assert.equal(collectionName, 'books');
  });

  it('@watch Books collection should have schema', () => {
    const schema = server.execute(() => {
      return Books._c2._simpleSchema._schema;
    });

    assert.isDefined(schema);
  });
});
