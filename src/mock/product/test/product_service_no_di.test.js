//ProductService에서 ProductClient를 사용하지만
//ProductService의 fetchAvailableItems 힘수만 단위테스트 하고싶은 경우 예시
const ProductClient = require('../product_client');
const ProductService = require('../product_service_no_di');

//ProductClient를 mock으로 사용할 것 지정
jest.mock('../product_client');

describe('ProductService', () => {
  //ProductClient 내부의 fetchItems mock 함수로 지정
  //해당 함수가 비동기함수니까 async 붙여줘야함
  const newFetchItems = jest.fn(async () => [
    { item: 'Milk', available: true },
    { item: 'Banana', available: false },
  ]);

  //ProductClient가 실행되면 fetchItems 함수 대신 newFetchItem 실행
  ProductClient.mockImplementation(() => {
    return {
      fetchItems: newFetchItems,
    };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();

    expect(items).toEqual([{ item: 'Milk', available: true }]);
    expect(items.length).toBe(1);
  });

  it('mockClear', async () => {
    const items = await productService.fetchAvailableItems();
    //true인 이유는 jest.config 파일에 clearMocks가 true이기 때문
    //false라면 beforeEach 메소드에서 반복되는 함수 mockClear() 해줘야 함
    expect(newFetchItems).toHaveBeenCalledTimes(1);
  });
});
