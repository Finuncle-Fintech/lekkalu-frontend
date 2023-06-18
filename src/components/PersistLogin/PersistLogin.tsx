import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../../hooks/useRefresh';

const PersistLogin = () => {
  const authToken = localStorage.getItem('TOKEN');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyIfHasToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !authToken ? verifyIfHasToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <p className="text-center mt-5">Loading...</p> : <Outlet />}
    </>
  );
};

export default PersistLogin;
