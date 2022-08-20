// import api ---> default donde tengp mi urlbase
import { api } from "./api";
import {successStatus, internatServerError} from '../utils/format-response'
//data = {email: vale@....}
//Login                       <https://.../api>/auth/login
export const loginWs = (data) => api.post("/auth/login", data)
  .then(successStatus)
  .catch(internatServerError)

//Signup
export const signupWs = (data) => api.post("/auth/signup", data)
.then(successStatus)
.catch(internatServerError)

//Logout
export const logoutWs = () => api.get("/auth/logout")
.then(successStatus)
.catch(internatServerError)
