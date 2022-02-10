class StubProductClient {
  async fetchItems() {
    return [
      { item: 'Milk', available: true },
      { item: 'Banana', available: false },
    ];
  }
}

module.exports = StubProductClient;
