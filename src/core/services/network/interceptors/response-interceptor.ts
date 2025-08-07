import {AxiosInstance} from 'axios';
// import {useAuthenticationStore} from "@/core/services/authentication/controllers/authentication-store";

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const authenticationService = container.get<IAuthenticationService>(AuthenticationService.key);
// const processQueue = (error: any, token: string | null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//
//   failedQueue = [];
// };

const responseInterceptor = async (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error:any) => {
      // const originalRequest = error.config;
      //
      // if (error.response.status === 401 && !originalRequest._retry) {
      //   if (isRefreshing) {
      //     return new Promise((resolve, reject) => {
      //       failedQueue.push({resolve, reject});
      //     })
      //       .then((token) => {
      //         originalRequest.headers.Authorization = `Bearer ${token}`;
      //         return axiosInstance(originalRequest);
      //       })
      //       .catch((err) => {
      //         return Promise.reject(err);
      //       });
      //   }
      //
      //   originalRequest._retry = true;
      //   isRefreshing = true;
      //
      //   try {
      //     const refreshToken = "await authStore.refreshToken()";
      //     if (!refreshToken) {
      //       window.location.href = '/auth/sign-in';
      //       return Promise.reject(error);
      //     }
      //
      //     const newToken = await authenticationService.getAccessToken()
      //     if (!newToken) {
      //       window.location.href = '/auth/sign-in';
      //       return Promise.reject(error);
      //     }
      //
      //     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      //     processQueue(null, newToken!);
      //
      //     originalRequest.headers.Authorization = `Bearer ${newToken}`;
      //     return axiosInstance(originalRequest);
      //   } catch (refreshError) {
      //     processQueue(refreshError, null);
      //     window.location.href = '/auth/sign-in';
      //     return Promise.reject(refreshError);
      //   } finally {
      //     isRefreshing = false;
      //   }
      // }

      return Promise.reject(error);
    }
  );
};

export default responseInterceptor;
