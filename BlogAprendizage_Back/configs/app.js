
'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import commentRoutes from '../src/comment/comment.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

import { createDefaultPublications } from '../src/publication/publication.controller.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)

}

const routes = (app)=>{
    app.use('/v1/comment', commentRoutes)
    app.use('/v1/publication', publicationRoutes)
}

export const initServer =()=>{
    const app= express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port: ${process.env.PORT}`)
        createDefaultPublications()
    }catch(err){
        console.error('Server init failed', err)
    }
}
