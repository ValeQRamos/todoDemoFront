//import api // default donte tengo mi urlBase
import { api } from "./api";
import { successStatus, internalServerError } from "../utils/format-response";
//data = {email:Dylan@..,password:"perrros"}
//Login                      <https://tinder/api>/auth/login
export const loginWs = (data) =>
  api.post("/auth/login", data).then(successStatus).catch(internalServerError);
//Signup
export const signupWs = (data) =>
  api.post("/auth/signup", data).then(successStatus).catch(internalServerError);
//Logout
export const logoutWs = () =>
  api.get("/auth/logout").then(successStatus).catch(internalServerError);