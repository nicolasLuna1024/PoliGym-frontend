import React from 'react'
import { Link } from 'react-router-dom';

import "./estilos.css"

const LandingPage = () => {
    return (
        <>
            <div>landingPage</div>
            <Link to='/auth/login'> Login </Link>
        </>
    )
}

export default LandingPage;