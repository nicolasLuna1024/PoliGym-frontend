import React, { useContext } from "react";
import axios from "axios"
import AuthContext from "../../../contexts/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

//Borrar el import de Navbar
// import Navbar from "../../../components/navegacion/navbar";
// import "../ClienteEntrenamientos/ClienteEntrenamientos.css";


const ClienteEntrenamientos = () => {

    const {auth, token} = useContext(AuthContext)

    console.log(auth)
    console.log(token)

    const handleSubmitTest = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}asistencias`;
        
        try {            
            const response = await axios.get(url, {
                withCredentials: true, // Enviar cookies automáticamente
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            console.log("Respuesta recibida:", response);
            toast.success("Solicitud hecha con éxito")
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    
/*
    const handleSubmitTest = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}asistencias`

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }

            //const respuesta = await axios.get(url, options, {withCredentials: true}) OJO - Meritorio de análisis recordatorio ----------------------------------------------------------------------------------------------------
            const respuesta = await axios.get(url, options)
            console.log(respuesta)
            toast.success("Solicitud hecha con éxito")
        } catch (error) {
            toast.error("Error al realizar la solicitud")
        }
    }
        */

    return (
        <div>
            <ToastContainer/>
            <form onSubmit={handleSubmitTest}>
                <button type="submit">Testear</button>
            </form>
            <div className="relative overflow-hidden shadow-md rounded-lg w-1/2 mx-auto">
                <table className="table-fixed w-full text-left">
                    <thead className="uppercase bg-gray-600 text-gray-200">
                        <tr>
                            <td className="py-3 border text-center p-4" >Nombre</td>
                            <td className="py-2 border text-center p-4" >Descripción</td>
                            <td className="py-2 border text-center p-4" >Series</td>
                            <td className="py-2 border text-center p-4" >Repeticiones</td>
                            <td className="py-2 border text-center p-2 w-16 text-xs" >Edit</td>
                            <td className="py-2 border text-center p-2 w-16 text-xs" >Delete</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-500">
                        <tr>
                            <td className="py-5 border text-center p-4" >YY-853581</td>
                            <td className="py-5 border text-center p-4" >Notebook Basic</td>
                            <td className="py-5 border text-center p-4" >$ 299</td>
                            <td className="py-5 border text-center p-4" >YY-853599</td>
                            <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1" >🖊️</button></td>
                            <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1">🗑️</button></td>

                        </tr>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="py-5 border text-center p-4" ></td>
                                <td className="py-5 border text-center p-4" ></td>
                                <td className="py-5 border text-center p-4" ></td>
                                <td className="py-5 border text-center p-4" ></td>
                                <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1" >🖊️</button></td>
                                <td className="py-5 border text-center p-2 w-16" ><button className="bg-white text-black border border-gray-300 rounded px-2 py-1">🗑️</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClienteEntrenamientos;
