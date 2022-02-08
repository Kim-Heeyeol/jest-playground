const fetchProduct = require('../async.js');

// 내가 테스트한 방식 resolves & rejects
test('the fetch success', () => {
  return expect(fetchProduct()).resolves.toEqual({
    item: 'Milk',
    price: 200,
  });
});

test('the fetch fails with an error', () => {
  return expect(fetchProduct('error')).rejects.toBe('Network error');
});

// 더 나은 방식
// describe - it 으로 묶기
describe('async', () => {
  let obj;

  beforeEach(() => {
    obj = {
      item: 'Milk',
      price: 200,
    };
  });

  //done 콜백을 사용하는 방법 : 코드가 더러운 단점
  it('async done', done => {
    fetchProduct().then(item => {
      expect(item).toEqual(obj);
      done();
    });
  });

  // 이 방법 실패.. 그냥 다른 방법 쓰자.
  // it('async done', done => {
  //   expect.assertions(1);
  //   const callback = function (data) {
  //     try {
  //       expect(data).toBe(obj);
  //       done();
  //     } catch (error) {
  //       done('Network error');
  //     }
  //   };

  //   fetchProduct(callback('error'));
  // });

  //return을 사용하는 방법 : return을 하면 왜 비동기 처리가 되는지?
  it('async return', () => {
    return fetchProduct().then(item => {
      expect(item).toEqual(obj);
    });
  });

  it('async return', () => {
    return fetchProduct('error').catch(error =>
      expect(error).toBe('Network error'),
    );
  });

  //async await을 사용하는 경우
  it('async await', async () => {
    const product = await fetchProduct();
    expect(product).toEqual(obj);
  });

  it('async await', async () => {
    expect.assertions(1);
    try {
      await fetchProduct('error');
    } catch (error) {
      expect(error).toBe('Network error');
    }
  });

  //resolves, rejects를 사용하는 경우
  //async await과 합쳐서 사용 가능
  it('async resolves', () => {
    return expect(fetchProduct()).resolves.toEqual(obj);
  });

  it('async rejects', () => {
    return expect(fetchProduct('error')).rejects.toBe('Network error');
  });
});
