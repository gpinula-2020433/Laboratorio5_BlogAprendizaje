import React, { useEffect, useState } from 'react'
import { getPublications } from '../service/api'
import PublicationCard from '../components/PublicationCard'
import FilterCourses from '../components/FilterCourses'
import './Publications.css'

const Publications = () => {
    const [publications, setPublications] = useState([])
    const [filtered, setFiltered] = useState([])
    const [activeCourse, setActiveCourse] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const res = await getPublications()
            if (!res.error) {
                // Ordenar por fecha descendente
                const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setPublications(sorted)
                setFiltered(sorted)
            }
        }
        fetchData()
    }, [])

    const handleFilter = (course) => {
        setActiveCourse(course)
        if (course === '') {
            setFiltered(publications)
        } else {
            // Filtrar y ordenar también las publicaciones filtradas
            const filteredAndSorted = publications
                .filter(pub => pub.course === course)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setFiltered(filteredAndSorted)
        }
    }

    return (
        <div className="publications-container">
            <FilterCourses onFilter={handleFilter} active={activeCourse} />
            <div className="publications-list">
                {filtered.map(pub => (
                    <PublicationCard key={pub._id} publication={pub} />
                ))}
            </div>
        </div>
    )
}

export default Publications