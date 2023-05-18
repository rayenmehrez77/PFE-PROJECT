export const isAuthenticated = (state) => {
  console.log(state);
  if (state.auth.auth.idToken) return true;
  return false;
};
