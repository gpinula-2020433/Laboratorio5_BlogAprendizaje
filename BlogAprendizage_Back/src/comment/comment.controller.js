import Comment from './comment.model.js'

//Función para registrar un comment
export const save = async(req, res) => {
    const data = req.body
    try {
        if(await Comment.findOne({comment: data.comment})){
            return res.send(
                {
                    success: false,
                    message: `The comment | ${data.comment} | already exists`
                }
            )
        }

        data.user = req.user.uid
        const comment = new Comment(data)
        await comment.save()
        return res.send(
            {
                success: true,
                message: `saved successfully`,
                comment
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
        const comments = await Comment.find()
            .skip(skip)
            .limit(limit)
            .populate('publication','title -_id')
            .populate('user','username -_id')

        if(comments.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comments not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Comments found:',
                total: comments.length + ' comments',
                comments
            }
        )
 
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding comment',
                err
            }
        )
    }
}


export const getComment = async(req, res)=>{
    try {
        let {id} = req.params
        let comment = await Comment.findById(id)
            .populate('publication','title -_id')
            .populate('user','username -_id')

        if(!comment)
        return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Comment found',
                comment
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

export const updateComment = async(req, res)=>{
    try {
        const { id } = req.params
        const data = req.body
        
        let commentToUpdate = await Comment.findById(id)
        if(req.user.uid != commentToUpdate.user){
            return res.send(
                {
                    success: false,
                    message: `${req.user.name} | No puedes actualizar un comentario que no sea tuyo`
                }
            )
        }

        if(await Comment.findOne({comment: data.comment})){
            return res.send(
                {
                    success: false,
                    message: `The comment | ${data.comment} | already exists`
                }
            )
        }

        const update = await Comment.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) 
        return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Comment updated',
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


export const deleteComment = async(req, res)=>{
    try {
        let {id} = req.params

        let commentToDelete = await Comment.findById(id)
        if(req.user.uid != commentToDelete.user){
            return res.send(
                {
                    success: false,
                    message: `${req.user.name} | No puedes eliminar un comentario que no sea tuyo`
                }
            )
        }

        let comment = await Comment.findByIdAndDelete(id)
        
        if(!comment) 
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not founded'
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
