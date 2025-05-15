import React from 'react'
import './CommentCard.css'

const CommentCard = ({ username, comment, createdAt }) => {
    const date = createdAt
        ? new Date(createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        })
        : 'Fecha inválida'

    return (
        <div className="comment-card">
            <div className="comment-header">
                <strong>{username}</strong>
                <span>{date}</span>
            </div>
            <p>{typeof comment === 'string' ? comment : JSON.stringify(comment)}</p>
        </div>
    )
}

export default CommentCard
