const check = require('../check.js');

describe('check', () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it('should call onSuccess when predicate is true', () => {
    check(() => true, onSuccess, onFail);

    expect(onSuccess).toBeCalledTimes(1);
    expect(onSuccess).toBeCalledWith('yes');
    expect(onFail).toBeCalledTimes(0);
  });

  it('should call onFail when predicate is false', () => {
    check(() => false, onSuccess, onFail);

    expect(onFail).toBeCalledTimes(1);
    expect(onFail).toBeCalledWith('no');
    expect(onSuccess).toBeCalledTimes(0);
  });
});
