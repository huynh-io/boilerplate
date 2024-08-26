/* eslint-disable import/prefer-default-export */

import { HELLO_WORLD_NAME_UPDATE } from "../constants/appConstants";

export const updateName = (text) => ({
  type: HELLO_WORLD_NAME_UPDATE,
  text,
});
