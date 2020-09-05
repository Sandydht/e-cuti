import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { sessionService } from "redux-react-session";

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(thunk)
));
sessionService.initSessionService(store);

export default store;