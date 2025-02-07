import React from "react";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";


//Páginas ruteadas
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

import Login from "./pages/Auth/Login/Login.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import Recover from "./pages/Auth/Recover/Recover.jsx";
import AuthLayout from "./pages/Auth/AuthLayout/AuthLayout.jsx";

import GestionUsuarios from "./pages/Admin/AdminGestionUsuarios/GestionUsuarios.jsx";
import Admin_newClient from "./pages/Admin/AdminNewClient/AdminNewClient.jsx";
import AdminLayout from "./pages/Admin/AdminLayout/AdminLayout.jsx";

import EntrenadorAsistencias from "./pages/Entrenador/EntrenadorAsistencias/EntrenadorAsistencias.jsx";

// import Navbar from "./components/navegacion/navbar.jsx";
import ClienteEntrenamientos from "./pages/Cliente/ClienteEntrenamientos/ClienteEntrenamientos.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Confirmar from "./pages/Auth/confirmEmail/Confirmar.jsx";
import Restablecer from "./pages/Auth/SetNewPassword/Restablecer.jsx";
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
            { path: "recovery", element: <Recover/> },
            
            //Ojo
            { path: "recovery-password/:token", element: <Restablecer/> }
        ]
    },

    //Ruteo de la página admin
    {
        path: "/admin/*",
        element: <AdminLayout></AdminLayout>,
        children: [
            { path: "", element: <GestionUsuarios></GestionUsuarios> },
            { path: "add", element: <Admin_newClient></Admin_newClient> }/*,
      {
        path: "/admin/delete"
      },
      {
        path: "/admin/update"
      }
      */
        ]

    },

    //Ruteo de las páginas entrenador
    {
        path: "entrenador",
        element: <EntrenadorAsistencias></EntrenadorAsistencias>,
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
                path: "progresos/:username",
                element: <AuthProvider> 
                    <ClienteProgresos></ClienteProgresos>
                </AuthProvider>
            },
            {
                path: "entrenamientos",
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

