export const isAuthenticated = (state) => {
    if (state.auth.token) return true;
    return false;
};
