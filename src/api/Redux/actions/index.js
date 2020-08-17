import { sessionService } from "redux-react-session";
import firebase from "../../Firebase";

// Ref
const auth = firebase.auth();
const pns = firebase.firestore().collection("pns");

export const loginAPI = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const refreshToken = res.user.refreshToken;
        const uid = res.user.uid;
        sessionService.saveSession({ refreshToken })
          .then(() => {
            pns
              .where("uid", "==", uid)
              .get()
              .then((querySnapshot) => {
                let data = {};
                querySnapshot.forEach(doc => {
                  data = {
                    uid: uid,
                    role: doc.data().role
                  };
                });
                sessionService.saveUser(data)
                  .then(() => resolve(true));
              });
          });
      })
      .catch(() => reject(false));
  });
};

export const registerAPI = (nip, nik, email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    pns
      .where("nip", "==", nip)
      .get()
      .then((nipSnapshot) => {
        let dataNIP = [];
        nipSnapshot.forEach(doc => dataNIP.push(doc.data()));
        if (dataNIP.length === 0) {
          return reject(false);
        } else {
          pns
            .where("nik", "==", nik)
            .get()
            .then((nikSnapshot) => {
              let dataNIK = [];
              nikSnapshot.forEach(doc => dataNIK.push(doc.data()));
              if (dataNIK.length === 0) {
                return reject(false);
              } else {
                pns
                  .where("nip", "==", nip)
                  .where("nik", "==", nik)
                  .get()
                  .then((querySnapshot) => {
                    let id = "";
                    querySnapshot.forEach(doc => id = doc.id);
                    auth
                      .createUserWithEmailAndPassword(email, password)
                      .then((res) => {
                        const uid = res.user.uid;
                        pns
                          .doc(id)
                          .update({
                            uid: uid,
                            role: "user"
                          })
                          .then(() => resolve(true));
                      });
                  });
              }
            });
        }
      });
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
      .catch(() => reject(false));
  });
};