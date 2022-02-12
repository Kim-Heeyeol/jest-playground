//특정 상황에만 테스트가 필요할 때 -> mock 사용
//현재 코드에서는 "로그인 되지 않았을 때만" login() 함수 실행 및 테스트
const UserService = require('../user_service');
const UserClient = require('../user_client');
//1.네트워크 로직을 mock 처리
jest.mock('../user_client');

describe('UserService', () => {
  //2.login 함수는 'success' 배출
  const login = jest.fn(async () => 'success');

  //3.UserClient 클래시의 login 함수를 (2)에 작성한 login 함수로 대체
  UserClient.mockImplementation(() => {
    return {
      login,
    };
  });

  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it('calls login() on UserClient when tries to login', async () => {
    //로그인 안돼있으므로 login함수는 한번 실행될 것
    await userService.login('abc', 'abc');
    expect(login.mock.calls.length).toBe(1);
  });

  it('should not call login() on UserClient again if already logged in', async () => {
    //login함수 1회 실행
    await userService.login('abc', 'abc');
    //UserService 클래스의 this.isLogedin = true 가 되었으므로 login함수는 실행되지 않음
    await userService.login('abc', 'abc');

    expect(login.mock.calls.length).toBe(1);
  });
});
