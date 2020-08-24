import firebase from "../../Firebase";
import { sessionService } from "redux-react-session";

export const loginAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const refreshToken = res.user.refreshToken;
        const uid = res.user.uid;
        sessionService.saveSession(refreshToken)
          .then(() => {
            firebase
              .firestore()
              .collection("pns")
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