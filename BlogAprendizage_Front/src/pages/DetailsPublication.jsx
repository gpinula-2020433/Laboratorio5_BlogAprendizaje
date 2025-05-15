import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    getPublicationById,
    getCommentsByPublication,
    createComment
} from '../service/api'
import CommentCard from '../components/CommentCard'
import './DetailsPublication.css'

const DetailsPublication = () => {
    const { id } = useParams()
    const [publication, setPublication] = useState(null)
    const [comments, setComments] = useState([])
    const [form, setForm] = useState({ username: '', comment: '' })

    useEffect(() => {
        const loadData = async () => {
            const pubRes = await getPublicationById(id)
            if (!pubRes.error) {
                setPublication(pubRes)
            }

            const commentsRes = await getCommentsByPublication(id)
            if (!commentsRes.error) {
                const sorted = commentsRes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setComments(sorted)
            }
        }

        loadData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.username.trim() || !form.comment.trim()) return

        const newComment = await createComment({ ...form, publication: id })

        if (!newComment.error) {
            setComments(prev => [newComment, ...prev])
            setForm({ username: '', comment: '' })
        }
    }

    return (
        <div className="details-publication">
            {publication && (
                <>
                    <h2>{publication.title}</h2>
                    <p><strong>Autor:</strong> {publication.author}</p>
                    <p>{publication.mainText}</p>
                </>
            )}

            <form onSubmit={handleSubmit} className="comment-form">
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <textarea
                    placeholder="Escribe tu comentario"
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                />
                <button type="submit">Enviar comentario</button>
            </form>
            <br />
            <h3>Comentarios</h3>
            {comments.length === 0 && <p>No hay comentarios aún.</p>}
            {comments.map(c => (
                <CommentCard key={c._id} {...c} />
            ))}
            
        </div>
    )
}

export default DetailsPublication
