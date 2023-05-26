import { useContext } from "react";
import { Context } from "provider/Provider";
import axiosClient from "components/Axios/Axios";

const useRefreshToken = () => {
    const { authToken, setAuthToken } = useContext(Context)

    const refresh = async () => {
        const response = await axiosClient.post('token/refresh/', 
        JSON.stringify({
            "refresh": authToken?.refresh
        })
        )

        setAuthToken(response?.data?.accessToken)

        return response.data?.accessToken
    }

    return refresh
}

export default useRefreshToken