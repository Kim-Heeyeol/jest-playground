function fetchProduct(error) {
  if (error === 'error') return Promise.reject('Network error');
  return Promise.resolve({ item: 'Milk', price: 200 });
}

module.exports = fetchProduct;
