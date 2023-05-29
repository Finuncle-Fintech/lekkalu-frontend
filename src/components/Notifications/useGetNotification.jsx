import { useQuery } from "react-query";
import axios from "axios";

const fetchNotification = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}tag/`, {
    auth: {
      username: process.env.REACT_APP_USER,
      password: process.env.REACT_APP_PASSWORD,
    },
  });

  return res.json();
};

export const useGetNotification = () => {
  const { data, isLoading, isError } = useQuery(
    "All Notifications",
    fetchNotification,
    {
      staleTime: 3000,
      refetchInterval: 3000,
    }
  );

  return { data, isLoading, isError };
};
