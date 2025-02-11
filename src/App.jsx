import React from "react";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";


//Páginas ruteadas
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword.jsx";
import AuthLayout from "./pages/Auth/AuthLayout/AuthLayout.jsx";

import GestionUsuarios from "./pages/Admin/AdminGestionUsuarios/GestionUsuarios.jsx";
import Admin_newClient from "./pages/Admin/AdminNewClient/AdminNewClient.jsx";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout.jsx";

import EntrenadorAsistencias from "./pages/Entrenador/EntrenadorAsistencias/EntrenadorAsistencias.jsx";

// import Navbar from "./components/navegacion/navbar.jsx";
import ClienteEntrenamientos from "./pages/Cliente/ClienteEntrenamientos/ClienteEntrenamientos.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Confirmar from "./pages/Auth/confirmEmail/Confirmar.jsx";
import ConfirmToken from "./pages/Auth/ConfirmToken/ConfirmToken.jsx";
import ClienteProgresos from "./pages/Cliente/ClienteProgresos/ClienteProgresos.jsx";
import ClienteLayout from "./pages/Cliente/ClienteLayout/ClienteLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>
    },

    {
        path: "/auth",
        element: (
            <AuthProvider> 
                <AuthLayout/> 
            </AuthProvider>),
        errorElement: <NotFound/>,
        children: [
            { path: "login", element: <AuthProvider> <Login/> </AuthProvider>},
            { path: "register", element: <Register/> },
            { path: "confirm/:token", element: <Confirmar/>},
            { path: "recovery", element: <ForgotPassword/> },
            
            //Ojo
            { path: "recovery-password", element: <ConfirmToken/> }
        ]
    },

    //Ruteo de la página admin
    {
        path: "/admin/*",
        element: <AdminLayout/>,
        children: [
            { path: "", element: <AuthProvider> <GestionUsuarios/> </AuthProvider> }
        ]
    },

    //Ruteo de las páginas entrenador
    {
        path: "entrenador",
        element: <AuthProvider> <EntrenadorAsistencias/> </AuthProvider>,
        children: [
            {}
        ]
    },

    //Ruteo de las páginas cliente
    {
        path: "cliente",

        element: 
            <AuthProvider> 
                <ClienteLayout/> 
            </AuthProvider>,
        children: [
            {
                path: "progresos/:username", //Actualizacion a /progresos:username
                element: <AuthProvider> 
                    <ClienteProgresos></ClienteProgresos>
                </AuthProvider>
            },
            {
                path: "rutinas/:username",
                element: <ClienteEntrenamientos></ClienteEntrenamientos>
            }

        ]
    }
])


const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};


// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         <h1>Bienvenido a PoliGym</h1>
//         <p>Contenido principal de la página.</p>
//       </div>
//     </div>
//   );
// };

export default App;

