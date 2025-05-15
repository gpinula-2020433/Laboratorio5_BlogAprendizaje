import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PublicationCard.css'

const PublicationCard = ({ publication }) => {
    const navigate = useNavigate()
    const { title, author, course, createdAt, _id } = publication

    const date = new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className="publication-card" onClick={() => navigate(`/publications/${_id}`)}>
            <h3>{title}</h3>
            <p><strong>Curso:</strong> {course}</p>
            <p><strong>Autor:</strong> {author}</p>
            <span>{date}</span>
        </div>
    )
}

export default PublicationCard
