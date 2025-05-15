import { Schema, model } from "mongoose";

const publicationSchema = Schema(
    {
        title: {
            type: String,
            maxLength: [45, `Can't be overcome 45 characters`],
            required: [true, 'Title is required'],
            trim: true
        },
        mainText: {
            type: String,
            maxLength: [1000, `Can't be overcome 1000 characters`],
            required: [true, 'Title is required'],
        },
        course: {
            type: String,
            enum: ['Taller', 'Tecnología', 'Práctica Supervisada'],
            required: [true, 'Course is required'],
        },
        author: {
            type: String,
            trim: true,
            required: [true, 'Author is required'],
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Publication', publicationSchema)