import React from 'react'
import './FilterCourses.css'

const courses = ['', 'Taller', 'Tecnología', 'Práctica Supervisada']

const FilterCourses = ({ onFilter, active }) => {
    return (
        <div className="filter-courses">
            {courses.map(course => (
                <button
                    key={course || 'all'}
                    className={active === course ? 'active' : ''}
                    onClick={() => onFilter(course)}
                >
                    {course || 'Todos'}
                </button>
            ))}
        </div>
    )
}

export default FilterCourses
