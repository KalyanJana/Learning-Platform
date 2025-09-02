import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Spinner from './components/ui/Spinner'
import { useState, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import apiClient from "./utils/apiClient";
import { set } from "react-hook-form";

export default function App() {
  const {isAuthenticated, login} = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    try{
      const tokenResponse = await apiClient.post("users/v1/token/refresh");

      const userResponse = await apiClient.get("users/v1/profile");

      login(tokenResponse.data.accessToken, userResponse.data);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(()=>{
    if(!isAuthenticated){
      refreshAccessToken();
    }else{
      setIsLoading(false)
    }
  }, [])

  if(isLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}