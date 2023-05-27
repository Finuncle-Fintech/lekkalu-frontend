import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import axios from "axios";

function SocialLogin() {
  const [accessToken, setAccessToken] = useState(null);

  // Google Login Success
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("http://localhost:8000/rest-auth/google/", {
        access_token: response.accessToken,
      });

      const data = res.data;
      console.log(data);
      setAccessToken(data.access_token);
    } catch (err) {
      console.log(err);
    }
  };

  // Google Login Error
  const responseGoogleError = (error) => {
    console.log(error);
  };

  // Facebook Login Success
  const responseFacebook = async (response) => {
    try {
      const res = await axios.post("http://localhost:8000/rest-auth/facebook/", {
        access_token: response.accessToken,
      });

      const data = res.data;
      console.log(data);
      setAccessToken(data.access_token);
    } catch (err) {
      console.log(err);
    }
  };

  // Facebook Login Error
  const responseFacebookError = (error) => {
    console.log(error);
  };

  // Apple Login Success
  const responseApple = async (response) => {
    try {
      const res = await axios.post("http://localhost:8000/rest-auth/apple_login/", {
        id_token: response.authorization.id_token,
      });

      const data = res.data;
      console.log(data);
      setAccessToken(data.access_token);
    } catch (err) {
      console.log(err);
    }
  };

  // Apple Login Error
  const responseAppleError = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="  1065900923652-qudpnguh6ogu4nhddpqc2r9ssnahtduf.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogleError}
        cookiePolicy={"single_host_origin"}
      />

      <FacebookLogin
        appId="225440500220299"
        fields="name,email,picture"
        callback={responseFacebook}
        onFailure={responseFacebookError}
      />

      <AppleLogin
        clientId="your-apple-client-id"
        redirectURI="your-redirect-uri"
        onSuccess={responseApple}
        onError={responseAppleError}
        responseType="code id_token"
      />

      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
}

export default SocialLogin;