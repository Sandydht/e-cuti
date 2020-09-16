import { sessionService } from 'redux-react-session';
import firebase from '../../firebase';

import {
  SET_LOADING,
  SET_USER
} from '../type';

export const login = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token, uid;

    return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        uid = res.user.uid;
        return res.user.getIdToken();
      })
      .then(idToken => {
        token = idToken;
        sessionService.saveSession(token)
          .then(() => {
            return firebase.firestore().collection('pns').where('uid', '==', uid).get()
              .then((querySnapshot) => {
                let role;
                querySnapshot.forEach(doc => role = doc.data().role);
                sessionService.saveUser({ role })
                  .then(() => {
                    dispatch(getUserData(uid));
                    return resolve();
                  });
              });
          });
      })
      .catch(() => reject());
  });
};

export const register = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const newUser = {
      nip: data.nip,
      nik: data.nik,
      noTelp: data.noTelp,
      email: data.email,
      password: data.password,
      register: true,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    let uid, token;

    return firebase.firestore().collection('pns').get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => data.push({
          id: doc.id,
          nip: doc.data().nip,
          nik: doc.data().nik,
          register: doc.data().register
        }));

        if ((data.filter(not => not.nip === newUser.nip).length && data.filter(not => not.nik === newUser.nik).length) === 0) {
          return reject();
        } else {
          let register;
          let pnsId;
          data
            .filter(not => not.nip === newUser.nip)
            .filter(not => not.nik === newUser.nik)
            .forEach(doc => {
              pnsId = doc.id;
              register = doc.register;
            });

          if (register === true) {
            return reject();
          } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
              .then(res => {
                uid = res.user.uid;
                return res.user.getIdToken();
              })
              .then(idToken => {
                token = idToken;
                sessionService.saveSession(token)
                  .then(() => {
                    return firebase.firestore().collection('pns').doc(pnsId).get()
                      .then(doc => {
                        if (doc.exists) {
                          return firebase.firestore().collection('pns').doc(pnsId).update({
                            register: newUser.register,
                            role: newUser.role,
                            createdAt: newUser.createdAt,
                            noTelp: newUser.noTelp,
                            email: newUser.email,
                            uid: uid
                          })
                            .then(() => {
                              sessionService.saveUser({ role: newUser.role })
                                .then(() => resolve());
                            });
                        }
                      });
                  });
              })
              .catch(() => reject());
          }
        }
      });
  });
};

export const getUserData = (uid) => (dispatch) => {
  dispatch({ type: SET_LOADING });
  let userData = {};
  return firebase.firestore().collection('pns').where('uid', '==', uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach(doc => userData.credentials = doc.data());
      dispatch({ type: SET_USER, payload: userData });
    });
};

export const logout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    return firebase.auth().signOut()
      .then(() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        return resolve();
      })
      .catch(() => reject());
  });
};