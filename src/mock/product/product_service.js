//해당 클래스를 사용하려면 상위에서 injection 해주면 됨
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
