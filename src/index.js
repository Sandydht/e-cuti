import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Material UI
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { sessionService } from "redux-react-session";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./api/Redux/reducers";

// Notistack
import { SnackbarProvider } from "notistack";

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(thunk)
));
sessionService.initSessionService(store);

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
          onClick={onClickDismiss(key)}
          color="inherit"
          size="small"
        >
          <CloseIcon fontSize="small" />
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
serviceWorker.unregister();
