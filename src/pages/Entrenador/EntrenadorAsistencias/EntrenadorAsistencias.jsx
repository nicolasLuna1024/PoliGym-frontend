import React from 'react'
import { Link } from 'react-router-dom';
import "./estilos.css"
//Borrar el import de Navbar


const EntrenadorAsistencias = () => {
    return (
        <>
            <div className='container'>
                <div className='sidebar'>
                    <div className='areaDatos'>
                        <div className='botonDatos'>
                            Datos
                        </div>
                    </div>
                    <div className='botonLogout'>
                        Cerrar Sesión
                    </div>
                </div>

                <div className='data'>
                    <div className='cabecera'>
                        <div className='numeracionCabecera'>N°</div>
                        <div className='nombreApellidoCabecera'>Nombre y Apellido</div>
                        <div className='usernameCabecera'>Username</div>
                        <div className='userEmailCabecera'>Correo</div>
                        <div className='verAsistenciasCabecera'>
                            Ver
                        </div>
                    </div>

                    <div className='searchBar'>
                        <div className='lupaSearchBar'>Lupa</div>
                        <input className='inputSearchBar' type="text" placeholder='Username'/>
                        <button className='buttonSearchBar'>Buscar</button>
                    </div>

                    <div className='usersDataContainer'>
                        <div className='userData'>
                            <div className='numeracion'>1</div>
                            <div className='nombreApellido'>Angel Maldonado</div>
                            <div className='username'>angel123</div>
                            <div className='userEmail'>polreqi123@gmail.com</div>
                            <div className='verAsistencias'>---</div>
                        </div>
                    </div>

                    <div className='paginacion'></div>
                </div>
            </div>
        
        </>
        
        
    )    
}

export default EntrenadorAsistencias;