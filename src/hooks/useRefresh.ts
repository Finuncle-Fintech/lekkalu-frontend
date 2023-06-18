import axios from 'axios';

import getCookie from '../components/Support/PopUp/utils/GetCookie';

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}token/refresh/`,
      JSON.stringify({
        refresh: getCookie('refresh'),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    localStorage.setItem('TOKEN', response?.data?.access);

    return response.data?.access;
  };

  return refresh;
};

export default useRefreshToken;
