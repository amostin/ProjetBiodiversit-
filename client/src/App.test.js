import {
  getUser,
  getToken,
  /*removeUserSession,*/
  setUserSession,
} from "./Utils/Common";
import axios from "axios";

test("Fake test", () => {
  expect(true).toBeTruthy();
});

test("getUser", () => {
  const Pseudo = "noot";
  const MdP = "noot123!";
  axios
    .post("/users/signin", {
      Pseudo: Pseudo.value,
      MdP: MdP.value,
    })
    .then((response) => {
      setUserSession(response.data.token, response.data.user);
    })
    .catch((error) => {
      console.log(error);
    });
  const userResponse = getUser();
  expect(userResponse).toBe(null);
});

test("getToken", () => {
  const Pseudo = "noot";
  const MdP = "noot123!";
  axios
    .post("/users/signin", {
      Pseudo: Pseudo.value,
      MdP: MdP.value,
    })
    .then((response) => {
      setUserSession(response.data.token, response.data.user);
    })
    .catch((error) => {
      console.log(error);
    });
  const tokenResponse = getToken();
  expect(tokenResponse).toBe(null);
});
