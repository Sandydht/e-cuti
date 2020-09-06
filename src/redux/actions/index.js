import Axios from "axios";
import { sessionService } from "redux-react-session";

export const login = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios.post("/login", user)
      .then(res => {
        const bearer = "Bearer";
        const FBIdToken = bearer.concat(` ${res.data.token}`);
        Axios.defaults.headers.common['Authorization'] = FBIdToken;
        sessionService.saveSession(FBIdToken)
          .then(() => {
            Axios.get("/dataUser")
              .then(res => {
                sessionService.saveUser({
                  role: res.data.role
                })
                  .then(() => {
                    return resolve(true);
                  });
              });
          });
      })
      .catch(() => reject(false));
  });
};

export const register = (newUser) => (dispatch) => {
  return new Promise((resolve, reject) => {
    Axios.post("/register", newUser)
      .then(res => {
        const FBIdToken = `Bearer ${res.data.token}`;
        Axios.defaults.headers.common['Authorization'] = FBIdToken;
        sessionService.saveSession({ FBIdToken })
          .then(() => {
            Axios.get("/dataUser")
              .then(res => {
                sessionService.saveUser({
                  role: res.data.role
                })
                  .then(() => resolve(true));
              });
          });
      })
      .catch(() => reject(false));
  });
};

export const logout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    delete Axios.defaults.headers.common['Authorization'];
    sessionService.deleteSession();
    sessionService.deleteSessionUser();
    return resolve(true);
  });
};