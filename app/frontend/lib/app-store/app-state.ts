import { AuthenticationSlice } from "./slices/authentication-slice";
import { MobileSlice } from "./slices/mobile-slice";

type AppState = AuthenticationSlice & MobileSlice;

export default AppState;
