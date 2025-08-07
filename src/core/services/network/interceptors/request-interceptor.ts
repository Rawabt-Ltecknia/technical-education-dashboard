import {AxiosInstance} from "axios";
import {authenticationService} from "@/core/services/authentications/authentication.service";



const requestInterceptor =async (axiosInstance: AxiosInstance) => {

  axiosInstance.interceptors.request.use(
    async (config :any) => {
      const token = await authenticationService.getAccessToken();
      alert("token" + token);
      if (token)
        config.headers.Authorization = `Bearer ${token}`;
      config.headers['Accept-Language'] = "ar";
      return config;
    },
    (error :any) => {
      return Promise.reject(error);
    }
  );
};

export default requestInterceptor;

