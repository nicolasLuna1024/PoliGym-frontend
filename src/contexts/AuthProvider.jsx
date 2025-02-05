import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({})
    const [token, setToken] = useState({})

    useLayoutEffect(()=> {
        const refreshInterceptor = axios.interceptors.response.use(
            function (response) {
                return response
            },
            async function (error) {
                const originalRequest = error.config
                console.log("OriginalRequest: ", error)
                console.log("Verified: ", error.response.data.verified)
                if (error.response?.status === 401 && error.response.data.verified === false)
                {
                    error.response.data.verified = true
                    console.log("AccessJWT generándose")
                    
                    try
                    {
                        const url = `${import.meta.env.VITE_BACKEND_URL}auth/refresh/${auth._id}`
                        const respuesta = await axios.get(url, {withCredentials: true})

                        const newAccessToken = respuesta.data.accessJwt

                        console.log("Respuesta", respuesta)
                        if (!newAccessToken) throw new Error("No se recibió un nuevo token")

                        setToken(newAccessToken)
                        

                        originalRequest.headers={
                            ...originalRequest.headers,
                            Authorization: `Bearer ${newAccessToken}`
                        }
                        
                        return axios(originalRequest);
                    }
                    catch (error) {
                        console.error("Error al refrescar el token: ", error)
                        setToken(null)
                        return Promise.reject(error) 
                    }  
                }
                return Promise.reject(error) 
            }
        );
        return () => {
            axios.interceptors.response.eject(refreshInterceptor)
        }
    }, [auth]);

    return (
        <AuthContext.Provider value= {
            {
                auth,
                setAuth,
                token,
                setToken
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;