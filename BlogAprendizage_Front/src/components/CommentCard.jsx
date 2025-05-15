import React from 'react'
import './CommentCard.css'

const CommentCard = ({ username, comment, createdAt }) => {
    const date = new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div className="comment-card">
            <div className="comment-header">
                <strong>{username}</strong>
                <span>{date}</span>
            </div>
            <p>{comment}</p>
        </div>
    )
}

export default CommentCard