import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            {/* Overlay */}
            <div className="overlay"></div>

            {/* Contenido principal */}
            <div className="content">
                <h1>Accede a la plataforma de entrenamiento</h1>
                <div className="buttons">
                    <Link to="/auth/login" className="button">
                        Iniciar Sesión
                    </Link>
                    <Link to="/auth/register" className="button">
                        Registrarse
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <img src="/1.png" alt="Logo" />
                    <div className="footer-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            Facebook
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                    </div>
                </div>
            </footer>

            {/* Estilos integrados */}
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Arial', sans-serif;
          background: url('/1.jpg') no-repeat center center fixed;
          background-size: cover;
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .overlay {
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .content {
          z-index: 10;
          position: relative;
          text-align: center;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .content h1 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .buttons a {
          text-decoration: none;
          padding: 12px 24px;
          background-color: red;
          color: white;
          font-weight: bold;
          border-radius: 5px;
        }
        .buttons a:hover {
          background-color: darkred;
        }
        footer {
          background-color: black;
          color: white;
          padding: 40px 20px;
          text-align: center;
          width: 100%;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-content img {
          width: 120px;
          height: auto;
        }
        .footer-links a {
          color: white;
          text-decoration: none;
          margin: 0 10px;
          font-size: 1.1rem;
        }
        .footer-links a:hover {
          text-decoration: underline;
        }
      `}</style>
        </>
    );
};

export default LandingPage;