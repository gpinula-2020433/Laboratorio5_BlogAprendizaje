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
                setPublications(res)
                setFiltered(res)
            }
        }
        fetchData()
    }, [])

    const handleFilter = (course) => {
        setActiveCourse(course)
        if (course === '') setFiltered(publications)
        else setFiltered(publications.filter(pub => pub.course === course))
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
