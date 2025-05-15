import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="home-container">
            <h1>Bienvenido al Blog de Aprendizaje</h1>
            <p>Explora las publicaciones de tus cursos técnicos</p>
            <button onClick={() => navigate('/publications')}>Ver Publicaciones</button>
        </div>
    )
}

export default Home
