import { applyMiddleware, combineReducers, compose } from "redux";
import PostsReducer from "./reducers/PostsReducer";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import todoReducers from "./reducers/Reducers";
//import { reducer as reduxFormReducer } from 'redux-form';
import { legacy_createStore as createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import TrainingsReducer from "./reducers/TrainingReducer";
import ActionsReducer from "./reducers/ActionReducer";
import ForumReducer from "./reducers/ForumReducer";

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  posts: PostsReducer,
  users: userReducer,
  auth: AuthReducer,
  trainings : TrainingsReducer,
  actions : ActionsReducer,
  forums : ForumReducer
  //form: reduxFormReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
//const store = createStore(rootReducers);
export const store = createStore(
  persistedReducer,
  composeEnhancers(middleware)
);
export const persistor = persistStore(store);
