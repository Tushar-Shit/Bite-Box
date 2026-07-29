import mongoose from "mongoose";

const tempoSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        OTP: {
            type: String,
            required: true,
            trim: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            expires: 0, // TTL index, delete after 0 microsecond of Date/Time
        },
    },
    {
        timestamps: true,

    })

const PendingSignup = mongoose.model("pendingSignup", tempoSchema);
export default PendingSignup;
