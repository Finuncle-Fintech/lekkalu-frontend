const authUtils = {
  checkUserAuth: () => {
    const token = localStorage.getItem('TOKEN');
    return Boolean(token);
  },
  logoutUser: () => {
    localStorage.removeItem('TOKEN');
  },
};

export default authUtils;
