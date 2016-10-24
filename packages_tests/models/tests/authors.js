describe('Models:authors', () => {
  it('@watch Authors collection should have name "authors"', () => {
    const collectionName = server.execute(() => {
      return Authors._name;
    });

    assert.equal(collectionName, 'authors');
  });

  it('@watch Authors collection should have schema', () => {
    const schema = server.execute(() => {
      return Authors._c2._simpleSchema._schema;
    });

    assert.isDefined(schema);
  });
});
