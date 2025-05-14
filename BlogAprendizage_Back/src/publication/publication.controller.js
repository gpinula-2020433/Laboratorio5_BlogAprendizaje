import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'

//Función para registrar un publication
export const save = async(req, res) => {
    const data = req.body
    try {
        //Si da false es porque no existe y lo guarda directamente
        if(await Publication.findOne({title: data.title})){
            return res.send(
                {
                    success: false,
                    message: `The title | ${data.title} | already exists `
                }
            )
        }

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
        
        const formattedPublications = publications.map(pub => ({
            ...pub.toObject(),
            dateFormatted: new Date(pub.date).toLocaleString()
        }));

        return res.send({
            success: true,
            message: 'Publications found:',
            total: formattedPublications.length + ' publications',
            publications: formattedPublications
        });
 
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
            .populate('category','name -_id')
            .populate('user','username -_id')
            
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

export const updatePublication = async(req, res)=>{
    try {
        const { id } = req.params
        const data = req.body

        let publicationToUpdate = await Publication.findById(id)
        if(req.user.uid != publicationToUpdate.user){
            return res.send(
                {
                    success: false,
                    message: `${req.user.name} | No puedes actualizar un comentario que no sea tuyo`
                }
            )
        }

        //Si da false es porque no existe y lo guarda directamente
        if(await Publication.findOne({title: data.title})){
            return res.send(
                {
                    success: false,
                    message: `The title | ${data.title} | already exists `
                }
            )
        }

        const update = await Publication.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) 
        return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Publication updated',
                user: update
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

export const deletePublication = async(req, res)=>{
    try {
        let {id} = req.params

        let publicationToDelete = await Publication.findById(id)
        if(req.user.uid != publicationToDelete.user){
            return res.send(
                {
                    success: false,
                    message: `${req.user.name} | No puedes eliminar una publicación que no sea tuya`
                }
            )
        }
        //Elimina los comentarios de esa publicacion
        await Comment.deleteMany({publication: id})

        let publication = await Publication.findByIdAndDelete(id)
        if(!publication) 
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publication not founded'
                }
            )
            return res.send(
                {
                    success: true,
                    message: 'Deleted succesfully!!!'
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
