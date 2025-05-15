import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'

//Función para registrar un publication
export const save = async(req, res) => {
    const data = req.body
    try {
        const publication = new Publication(data)
        await publication.save()
        return res.send(
            {
                success: true,
                message: `${publication.title} | saved successfully`,
                publication
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Obtener todos
export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try{
        const publications = await Publication.find()
            .skip(skip)
            .limit(limit)

        if(publications.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publications not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Publications found:',
                total: publications.length + ' publications',
                publications
            }
        )
 
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding publication',
                err
            }
        )
    }
}

export const getPublication = async(req, res)=>{
    try {
        let {id} = req.params
        let publication = await Publication.findById(id)
            
        if(!publication)
        return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Publication found',
                publication
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
