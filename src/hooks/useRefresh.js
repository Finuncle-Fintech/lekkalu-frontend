import { useContext } from "react";
import { Context } from "provider/Provider";
import axiosClient from "components/Axios/Axios";
import getCookie from "components/Support/PopUp/utils/GetCookie";

const useRefreshToken = () => {
    const { setAuthToken } = useContext(Context)

    const refresh = async () => {
        const response = await axiosClient.post('token/refresh/',
            JSON.stringify({
                "refresh": getCookie("refresh")
            }),
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )

        setAuthToken(response?.data?.access)

        return response.data?.access
    }

    return refresh
}

export default useRefreshToken