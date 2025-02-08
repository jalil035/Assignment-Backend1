import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        position: { type: String, required: true },
        bio: { type: String },
        img: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const TeamModel = mongoose.model("teams", DataSchema);

export default TeamModel;
