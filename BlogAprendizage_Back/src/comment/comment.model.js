import { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        username: {
            type: String,
            maxLength: [45, `Can't be overcome 45 characters`],
            required: [true, 'Username is required'],
            trim: true
        },
        comment: {
            type: String,
            maxLength: [1000, `Can't be overcame 1000 characters`],
            required: [true, 'Comment is required']
        },
        publication: { 
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Publication is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Comment', commentSchema)