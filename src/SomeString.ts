import mongoose, {Schema, Document} from 'mongoose'

export interface ISomeString extends Document {
    _id: mongoose.Types.ObjectId;

    str: string

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const SomeStringSchema: Schema = new Schema(
    {
        str: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<ISomeString>('user', SomeStringSchema);