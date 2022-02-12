//dependency injection이 제대로 된 코드를 테스트 할 때
//임의로 만든 stub_product_client를 ProductService에 주입해주면 됨
const StubProductClient = require('./stub_product_client.js');
const ProductService = require('../product_service.js');

describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();

    expect(items).toEqual([{ item: 'Milk', available: true }]);
    expect(items.length).toBe(1);
  });
});
