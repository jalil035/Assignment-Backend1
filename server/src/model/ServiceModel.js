import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number,required: true },
        img: { type: String },
        phone: { type: Number }//Image field
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ServiceModel = mongoose.model('Service', ServiceSchema);

export default ServiceModel;
