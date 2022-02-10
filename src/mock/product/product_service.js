class productService {
  constructor(ProductClient) {
    this.productClient = ProductClient;
  }

  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then(items => items.filter(item => item.available));
  }
}

module.exports = productService;
