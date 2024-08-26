import { createStore } from "redux";
import appReducer from "../reducers/appReducer";

const configureStore = (railsProps) => createStore(appReducer, railsProps);

export default configureStore;
