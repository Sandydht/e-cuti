import firebase from "../../Firebase";
import { sessionService } from "redux-react-session";

// Reference 
const auth = firebase.auth();
const pns = firebase.firestore().collection("pns");

export const loginAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const refreshToken = res.user.refreshToken;
        const uid = res.user.uid;
        sessionService.saveSession(refreshToken)
          .then(() => {
            pns
              .where("uid", "==", uid)
              .get()
              .then((querySnapshot) => {
                let role;
                querySnapshot.forEach(doc => role = doc.data().role);
                sessionService.saveUser({ uid, role })
                  .then(() => resolve(true));
              });
          });
      })
      .catch(() => reject(false));
  });
};

export const logoutAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        return resolve(true);
      })
      .catch(() => {
        return reject(false);
      });
  });
};