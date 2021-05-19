import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./modalReducer";
import userInfoReducer from "./userInfoReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfoReducer"],
};
const rootReducer = combineReducers({ modalReducer, userInfoReducer });

export default persistReducer(persistConfig, rootReducer);
