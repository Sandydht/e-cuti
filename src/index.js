import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux
import { Provider } from 'react-redux';
import store from './config/redux';

// Notistack
import { SnackbarProvider } from 'notistack';

// Firebase
import firebase from './config/firebase';

// Material UI
import IconButton from '@material-ui/core/IconButton';

// Material icons
import CloseIcon from '@material-ui/icons/Close';

firebase.firestore().enablePersistence()
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      console.log(err);
    } else if (err.code === 'unimplemented') {
      console.log(err);
    }
  });

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};


ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={1}
      ref={notistackRef}
      action={(key) => (
        <IconButton
          color='inherit'
          size='small'
          onClick={onClickDismiss(key)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      )}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
