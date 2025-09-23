import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
});
//access token ekle
axiosInstance.interceptors.request.use(config =>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }return config;
})
//süresi dolan tokenı yenile
axiosInstance.interceptors.response.use(
    response => response,
    async error=>{
        const originalRequest = error.config;
        // Token expired hatasıysa ve daha önce retry edilmediyse
        if(
            error.response?.status === 403 &&
            error.response?.data?.message === "Token expired or invalid" &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const res = await axios.post("http://localhost:3000/api/v1/refresh", {
                    refreshToken
                });

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                // Yeni token ile isteği tekrar gönder
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
            }
            return Promise.reject(error);
        }
    }
)

export default axiosInstance;