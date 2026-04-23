import axios from "axios";
import LoginForm from "../components/Form/LoginForm";
import { GoogleLogin } from "@react-oauth/google";
import { BASE_URL } from "../constants/url";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/google-login`,
        { location: userLocation }, // Send location in the body
        {
          headers: {
            access_token_google: credentialResponse.credential,
          },
        },
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const googleLoginButton = <GoogleLogin onSuccess={handleGoogleLogin} />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm googleLoginButton={googleLoginButton} />
    </div>
  );
}
