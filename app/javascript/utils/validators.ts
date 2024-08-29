// TODO: better validation, move into utils
export const validateEmailAndPassword = (
  email: string,
  password: string
): boolean => {
  return !!email && !!password;
};
