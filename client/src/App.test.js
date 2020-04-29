import {
  getUser,
  getToken,
  removeUserSession,
  setUserSession,
} from "./Utils/Common";

test("Fake test", () => {
  expect(true).toBeTruthy();
});

test("Test getUser", () => {
  const user = '{"UserID": 99,"Nom": "test","Pseudo": "test","Admin": 1 }';
  sessionStorage.setItem("user", JSON.stringify(user));
  const userResponse = getUser();
  expect(userResponse).toBe(
    '{"UserID": 99,"Nom": "test","Pseudo": "test","Admin": 1 }'
  );
});

test("Test getToken", () => {
  const token = '"token": "tokenExample151fsza"';
  sessionStorage.setItem("token", token);
  const tokenResponse = getToken();
  expect(tokenResponse).toBe('"token": "tokenExample151fsza"');
});
/*
test("Test setUserSession", () => {
  const tokenResponse = getToken();
  expect(tokenResponse).toBe(null);
});

test("Test removeUserSession", () => {
  const tokenResponse = getToken();
  expect(tokenResponse).toBe(null);
});
*/
