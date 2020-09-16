import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
sessionService.initSessionService(store, { driver: 'LOCALSTORAGE' });

export default store;