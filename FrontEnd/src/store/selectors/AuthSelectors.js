export const isAuthenticated = (state) => {
<<<<<<< HEAD
  console.log(state);
  if (state.auth.auth.idToken) return true;
  return false;
=======
    if (state.auth.token) return true;
    return false;
>>>>>>> bf13c5f181e61b5de63ce7f9283ae67c79c9883e
};
