import { getUser, getToken, removeUserSession, setUserSession } from "./Common";

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
  const token = "tokenExample151fsza";
  sessionStorage.setItem("token", token);
  const tokenResponse = getToken();
  expect(tokenResponse).toBe("tokenExample151fsza");
});

test("Test setUserSession", () => {
  const token = "tokenExample151fsza";
  const user = '{"UserID": 99,"Nom": "test","Pseudo": "test","Admin": 1 }';
  setUserSession(token, user);
  expect(sessionStorage.getItem("token")).toBe("tokenExample151fsza");
});

test("Test removeUserSession", () => {
  sessionStorage.setItem("token", "test");
  sessionStorage.setItem("user", "test");
  removeUserSession();
  expect(sessionStorage.getItem("user")).toBe(null);
});
